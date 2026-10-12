import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DonationForm } from '@/features/donation';

describe('DonationForm', () => {
  it('tells donors that online giving is not available yet and where to go instead', () => {
    render(<DonationForm />);

    expect(screen.getByRole('status')).toHaveTextContent(/online donations are not available yet/i);
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '/contact');
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
