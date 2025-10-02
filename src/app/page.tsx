import { redirect } from 'next/navigation';

export default function Home() {
  // For now, redirect to the manager dashboard.
  // We can add a landing page here later.
  redirect('/Manager');
}
