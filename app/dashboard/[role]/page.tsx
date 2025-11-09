export default async function DashboardPage({
  params,
}: {
  params: Promise<{ role: string }>
}) {
  const { role } = await params
  return <div>My Post: {role}</div>
}