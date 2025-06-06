import FactDetail from './FactDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Fato sobre Gatos #${id}`,
    description: `Detalhes do fato curioso de número ${id}.`,
  };
}

export default async function FactDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <FactDetail id={id} />;
}