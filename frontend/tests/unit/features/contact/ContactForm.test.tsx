import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/features/contact';
import { apiClient } from '@/shared/lib/api-client';

vi.mock('@/shared/lib/api-client', () => ({ apiClient: { post: vi.fn() } }));

const post = vi.mocked(apiClient.post);

function renderForm() {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ContactForm />
    </QueryClientProvider>,
  );
}

async function fillValidMessage() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Your Name'), 'Hana Tesfaye');
  await user.type(screen.getByLabelText('Email Address'), 'hana@example.com');
  await user.type(screen.getByLabelText('Subject'), 'Assessment appointment');
  await user.type(
    screen.getByLabelText('Message'),
    'I would like to book an assessment for my son.',
  );
  return user;
}

describe('ContactForm', () => {
  beforeEach(() => {
    // Block body: a function returned from beforeEach would run as a teardown hook.
    post.mockReset();
  });

  it('sends the visitor’s message to the public contact endpoint', async () => {
    post.mockResolvedValue({ data: {} });
    renderForm();

    const user = await fillValidMessage();
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() =>
      expect(post).toHaveBeenCalledWith('/public/contact', {
        name: 'Hana Tesfaye',
        email: 'hana@example.com',
        subject: 'Assessment appointment',
        message: 'I would like to book an assessment for my son.',
      }),
    );
  });

  it('confirms delivery and clears the form only after the message is accepted', async () => {
    post.mockResolvedValue({ data: {} });
    renderForm();

    const user = await fillValidMessage();
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/message has been sent/i);
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });

  it('keeps everything the visitor typed and explains the failure when sending fails', async () => {
    post.mockRejectedValue(new Error('Network Error'));
    renderForm();

    const user = await fillValidMessage();
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not send your message/i);
    expect(screen.getByLabelText('Message')).toHaveValue(
      'I would like to book an assessment for my son.',
    );
    expect(screen.getByLabelText('Email Address')).toHaveValue('hana@example.com');
  });

  it('omits an empty subject, which the API treats as optional', async () => {
    post.mockResolvedValue({ data: {} });
    renderForm();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Your Name'), 'Hana Tesfaye');
    await user.type(screen.getByLabelText('Email Address'), 'hana@example.com');
    await user.type(screen.getByLabelText('Message'), 'Do you run weekend sessions for teens?');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(post.mock.calls[0][1]).not.toHaveProperty('subject');
  });

  it('does not contact the API while the input is invalid', async () => {
    renderForm();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email Address'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    expect(post).not.toHaveBeenCalled();
  });

  it('prevents a second submission while the first is still sending', async () => {
    post.mockReturnValue(new Promise(() => undefined));
    renderForm();

    const user = await fillValidMessage();
    await user.click(screen.getByRole('button', { name: /send message/i }));

    const sending = await screen.findByRole('button', { name: /sending/i });
    expect(sending).toBeDisabled();
    await user.click(sending);
    expect(post).toHaveBeenCalledTimes(1);
  });
});
