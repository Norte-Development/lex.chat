import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import { guestRegex } from '@/lib/constants';
import { SubscriptionWrapper } from '@/components/subscription-wrapper';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/landing');
  }

  // Check if user is a guest and redirect to landing
  const isGuest = guestRegex.test(session.user?.email ?? '');
  if (isGuest) {
    redirect('/landing');
  }

  const id = generateUUID();

  return (
    <SubscriptionWrapper session={session}>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </SubscriptionWrapper>
  );
}
