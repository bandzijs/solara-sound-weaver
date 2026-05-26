import { createAdminClient } from '@/lib/supabase/admin'
import OrdersClient from './OrdersClient'
import type { Submission } from '@/lib/types'

export const revalidate = 0

export default async function AdminOrdersPage() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const orders: Submission[] = error ? [] : (data ?? [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-syne font-bold text-white text-2xl">Orders</h1>
          <p className="text-white/40 text-sm mt-1">{orders.length} total</p>
        </div>
      </div>
      <OrdersClient initialOrders={orders} />
    </div>
  )
}
