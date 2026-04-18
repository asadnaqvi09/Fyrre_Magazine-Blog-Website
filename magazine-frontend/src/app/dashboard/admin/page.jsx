import AdminStats from "@/components/dashboard/admin/home/AdminStats"
import RecentSubmissions from "@/components/dashboard/admin/home/RecentSubmissions"

export default function Page({title = 'Admin Home'}) {
  return (
      <section className="flex flex-col gap-10" title={title}>
        <AdminStats />
        <RecentSubmissions />
      </section>
  );
}