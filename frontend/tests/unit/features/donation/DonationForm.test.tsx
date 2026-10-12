import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DonationForm } from '@/features/donation';

describe('DonationForm', () => {
  it('tells donors that online giving is coming soon and how to support the center today', () => {
    render(<DonationForm />);

    const notice = screen.getByRole('status');
    expect(notice).toHaveTextContent('Online donations are coming soon');
    expect(within(notice).getByRole('link', { name: 'volunteering' })).toHaveAttribute(
      'href',
      '/volunteer',
    );
    expect(within(notice).getByRole('link', { name: 'attending events' })).toHaveAttribute(
      'href',
      '/events',
    );
    expect(within(notice).getByRole('link', { name: 'contacting our Center' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('cannot be filled in or submitted, so no donor believes a gift went through', async () => {
    render(<DonationForm />);
    const user = userEvent.setup();

    const donate = screen.getByRole('button', { name: /donate/i });
    expect(donate).toBeDisabled();
    expect(screen.getByLabelText('Email Address')).toBeDisabled();
    for (const preset of screen.getAllByRole('button', { name: /^\$\d+$/ })) {
      expect(preset).toBeDisabled();
    }

    await user.type(screen.getByLabelText('First Name'), 'Hana');
    expect(screen.getByLabelText('First Name')).toHaveValue('');
  });
});
