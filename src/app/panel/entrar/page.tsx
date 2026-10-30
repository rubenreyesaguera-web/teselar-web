import { redirect } from 'next/navigation';
import { haySesion } from '@/lib/panel/acceso';
import FormEntrar from '@/components/panel/FormEntrar';

export const dynamic = 'force-dynamic';

export default async function Entrar() {
  if (await haySesion()) redirect('/panel');
  return (
    <main className="entrada">
      <FormEntrar />
    </main>
  );
}
