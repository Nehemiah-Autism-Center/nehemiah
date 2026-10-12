'use client';

import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';

const presetAmounts = [25, 50, 100, 250, 500];

/**
 * Online giving is switched off until the donations API and its checkout flow are live.
 * The form is shown for context but every control is disabled and nothing can be submitted,
 * so no donor can come away believing a gift went through.
 */
export function DonationForm() {
  return (
    <div className="space-y-8">
      <div role="status" className="bg-primary/10 text-heading rounded-md p-4 md:p-6">
        <p className="font-serif text-lg font-semibold">Online donations are coming soon</p>
        <p className="mt-1 text-sm md:text-base">
          While online donations are coming soon, support us by{' '}
          <Link href="/volunteer" className="text-primary font-semibold underline">
            volunteering
          </Link>
          ,{' '}
          <Link href="/events" className="text-primary font-semibold underline">
            attending events
          </Link>
          , or{' '}
          <Link href="/contact" className="text-primary font-semibold underline">
            contacting our Center
          </Link>{' '}
          today.
        </p>
      </div>

      <form onSubmit={(event) => event.preventDefault()}>
        <fieldset disabled className="space-y-8 opacity-60">
          <legend className="sr-only">Donation details (currently unavailable)</legend>

          <div>
            <p className="mb-3 text-sm font-medium">Select Amount</p>
            <div className="flex flex-wrap gap-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="text-text-dark rounded bg-gray-100 px-6 py-3 font-semibold"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="amount">Custom Amount ($)</Label>
            <Input id="amount" type="number" placeholder="Enter custom amount" className="mt-1" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Last name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Email address" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input id="phone" type="tel" placeholder="Phone number" className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" placeholder="Leave a message..." rows={4} className="mt-1" />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded py-3 text-lg font-semibold text-white uppercase"
          >
            Donate Now
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
