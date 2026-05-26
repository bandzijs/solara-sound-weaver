'use client'

import { useState } from 'react'
import type { Submission } from '@/lib/types'

interface Props {
  initialOrders: Submission[]
}

export default function OrdersClient({ initialOrders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Submission | null>(null)

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <>
      {initialOrders.length === 0 ? (
        <div className="text-center py-20 text-white/30">No orders yet.</div>
      ) : (
        <div className="bg-navy3 border border-k1/20 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-k1/20">
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Mood</th>
                <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {initialOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`hover:bg-k1/5 transition-colors cursor-pointer ${idx !== initialOrders.length - 1 ? 'border-b border-k1/10' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="px-5 py-3 text-white font-medium">{order.name}</td>
                  <td className="px-5 py-3 text-white/60">{order.email}</td>
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-k2/10 text-k4 border border-k2/20">
                      {order.mood}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-white/40 text-xs">{formatDate(order.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-k3 hover:text-white text-xs font-medium transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Poem modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-navy3 border border-k1/25 rounded-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-k1/20">
              <div>
                <h2 className="font-syne font-bold text-white text-lg">{selectedOrder.name}</h2>
                <p className="text-white/40 text-sm">{selectedOrder.email}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-k2/15 text-k3 border border-k3/25">
                  {selectedOrder.mood}
                </span>
                <span className="text-white/30 text-xs">{formatDate(selectedOrder.created_at)}</span>
              </div>

              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Poem / Story</p>
                <div className="bg-navy2 border border-k1/15 rounded-xl px-5 py-4">
                  <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{selectedOrder.poem_text}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-k1/20 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/50 hover:text-white text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
