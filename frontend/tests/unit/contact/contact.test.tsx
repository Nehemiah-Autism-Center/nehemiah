import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderIn } from '../helpers';
import { contactSchema } from '@/features/contact/schemas/contact.schema';
import { MAX_MAILTO_LENGTH, buildMailtoUrl, composeBody } from '@/features/contact/utils/mailto';

const params = vi.hoisted(() => ({ search: '' }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/en/contact',
  useSearchParams: () => new URLSearchParams(params.search),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

import { ContactForm } from '@/features/contact/components/ContactForm';
import { ContactFormWithTopic } from '@/features/contact/components/ContactFormWithTopic';

const valid = {
  name: 'Abebe Kebede',
  email: 'abebe@example.org',
  subject: 'Visiting the Center',
  message: 'I would like to visit on Saturday morning, please.',
};

describe('contactSchema', () => {
  it('accepts a complete message', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects short or malformed fields with a message per field', () => {
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'nope',
      subject: 'Hi',
      message: 'short',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((i) => i.path[0]);
      expect(fields.sort()).toEqual(['email', 'message', 'name', 'subject']);
    }
  });

  it('trims whitespace before validating', () => {
    expect(contactSchema.safeParse({ ...valid, name: '  A  ' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, name: '  Ab  ' }).data?.name).toBe('Ab');
  });
});

describe('mailto builder', () => {
  it('encodes spaces as %20 and line breaks as %0A, never "+"', () => {
    const url = buildMailtoUrl('Nehemiah.center@yahoo.com', valid);
    expect(url.startsWith('mailto:Nehemiah.center@yahoo.com?subject=')).toBe(true);
    expect(url).toContain('subject=Visiting%20the%20Center');
    expect(url).toContain('%0A');
    expect(url).not.toMatch(/\+/);
  });

  it('puts the message first and the sender last', () => {
    expect(composeBody(valid)).toBe(`${valid.message}\n\n—\n${valid.name}\n${valid.email}`);
  });

  it('round-trips Amharic text', () => {
    const url = buildMailtoUrl('a@b.org', { ...valid, subject: 'ከእኛ ጋር በበጎ ፈቃድ ይሳተፉ' });
    const subject = new URL(url).searchParams.get('subject');
    expect(subject).toBe('ከእኛ ጋር በበጎ ፈቃድ ይሳተፉ');
  });
});

describe('ContactForm', () => {
  let assign: ReturnType<typeof vi.fn>;
  const original = window.location;

  beforeEach(() => {
    assign = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...original, assign },
    });
  });
  afterEach(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });

  const fill = (values: typeof valid) => {
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: values.name } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: values.email } });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: values.subject } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: values.message } });
  };

  it('tells the visitor up front that nothing is sent from the website', () => {
    renderIn('en', <ContactForm />);
    expect(screen.getByText(/opens your own email app/)).toBeInTheDocument();
    expect(
      screen.getByText(/Nothing is sent from this website, and nothing is stored here/),
    ).toBeInTheDocument();
  });

  it('shows an accessible error for every invalid field and does not open the email app', async () => {
    renderIn('en', <ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /Write my email/ }));
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(4);
    expect(screen.getByLabelText('Your name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Your name')).toHaveAccessibleDescription(/at least 2 characters/);
    expect(assign).not.toHaveBeenCalled();
    expect(screen.queryByText(/sent/i)).not.toHaveTextContent(/successfully/);
  });

  it('opens the email app with the prepared message and states that it has not been sent', async () => {
    renderIn('en', <ContactForm />);
    fill(valid);
    fireEvent.click(screen.getByRole('button', { name: /Write my email/ }));

    await waitFor(() => expect(assign).toHaveBeenCalledTimes(1));
    const url = assign.mock.calls[0][0] as string;
    expect(url).toMatch(
      /^mailto:Nehemiah\.center@yahoo\.com\?subject=Visiting%20the%20Center&body=/,
    );
    expect(decodeURIComponent(url)).toContain(valid.message);

    const status = await screen.findByText(/It has not been sent yet/);
    expect(status).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/successfully|thank you|message (was )?sent\b/i);
  });

  it('keeps what the visitor typed after preparing the email', async () => {
    renderIn('en', <ContactForm />);
    fill(valid);
    fireEvent.click(screen.getByRole('button', { name: /Write my email/ }));
    await screen.findByText(/It has not been sent yet/);
    expect(screen.getByLabelText('Message')).toHaveValue(valid.message);
  });

  it('refuses a message too long for a mailto link instead of silently truncating it', async () => {
    renderIn('en', <ContactForm />);
    fill({ ...valid, message: 'x'.repeat(MAX_MAILTO_LENGTH + 100) });
    fireEvent.click(screen.getByRole('button', { name: /Write my email/ }));
    expect(await screen.findByText(/may be cut off by some email apps/)).toBeInTheDocument();
    expect(assign).not.toHaveBeenCalled();
  });

  it('labels fields in Amharic and tags English-only messages with lang="en"', async () => {
    renderIn('am', <ContactForm />);
    expect(screen.getByLabelText('ስምዎ')).toBeInTheDocument();
    expect(screen.getByLabelText('ኢሜይል አድራሻ')).toBeInTheDocument();
    expect(screen.getByLabelText('ርዕስ')).toBeInTheDocument();
    expect(screen.getByLabelText('መልዕክት')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /ኢሜይሌን አዘጋጅ/ }));
    const alerts = await screen.findAllByRole('alert');
    for (const alert of alerts) expect(alert).toHaveAttribute('lang', 'en');
  });
});

describe('ContactFormWithTopic', () => {
  it('pre-fills the subject with the approved label when opened for volunteering', () => {
    params.search = 'topic=volunteer';
    renderIn('en', <ContactFormWithTopic />);
    expect(screen.getByLabelText('Subject')).toHaveValue('Volunteer With Us');
  });

  it('pre-fills the subject in Amharic for a partnership enquiry', () => {
    params.search = 'topic=partnership';
    renderIn('am', <ContactFormWithTopic />);
    expect(screen.getByLabelText('ርዕስ')).toHaveValue('ከእኛ ጋር አጋር ይሁኑ');
  });

  it('leaves the subject empty for an unknown topic', () => {
    params.search = 'topic=anything-else';
    renderIn('en', <ContactFormWithTopic />);
    expect(screen.getByLabelText('Subject')).toHaveValue('');
  });
});
