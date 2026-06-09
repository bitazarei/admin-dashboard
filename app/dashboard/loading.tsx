export default function DashboardLoading() {
  return (
    <div className="p-8">
      {/* هدر */}
      <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mb-8"></div>
      
      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      
      {/* تیتر جدول */}
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
      
      {/* اسکلتون جدول */}
      <div className="border rounded-lg">
        <div className="h-12 bg-gray-200 rounded-t-lg animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 animate-pulse border-t"></div>
        ))}
      </div>
    </div>
  );
}