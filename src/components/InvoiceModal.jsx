import { Printer, Share2, X, Download, CheckCircle2 } from 'lucide-react';

export default function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const formattedInvoiceDate = invoice.invoiceDate || '17 May 2026';
  const formattedDueDate = invoice.dueDate || formattedInvoiceDate;
  const terms = invoice.terms || 'Due on Receipt';

  const items = invoice.items && invoice.items.length > 0
    ? invoice.items
    : [
        { description: '16*24 page 30 Album', qty: 1, rate: 0, amount: 0 },
        { description: '20*30 Enlargement 02', qty: 2, rate: 0, amount: 0 },
        { description: '16*24 Enlargement 01', qty: 1, rate: 0, amount: 0 },
        { description: 'Thank You Card', qty: 150, rate: 0, amount: 0 },
        { description: 'Video 2 Camera', qty: 1, rate: 0, amount: 0 },
        { description: 'Full Wedding Coverage Total', qty: 1, rate: 243000, amount: 243000 },
      ];

  const subTotal = invoice.subTotal ?? items.reduce((acc, i) => acc + (i.amount || 0), 0);
  const total = invoice.total ?? subTotal;
  const paidAmount = invoice.paidAmount ?? 0;
  const balanceDue = invoice.balanceDue ?? (total - paidAmount);

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `Hello ${invoice.clientName},\nHere is your official NS Studio Invoice (${invoice.invoiceNumber}):\nTotal: LKR ${total.toLocaleString()}\nBalance Due: LKR ${balanceDue.toLocaleString()}\nThank you!`;
    const phone = (invoice.clientPhone || '').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone.startsWith('94') ? phone : '94' + phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-3xl shadow-2xl overflow-hidden my-8 print:shadow-none print:my-0 print:rounded-none print:w-full print:max-w-none">

        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
              Invoice #{invoice.invoiceNumber || 'INV-026'}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                invoice.paymentStatus === 'Paid'
                  ? 'bg-brand-secondary/20 text-brand-secondary/90 border border-brand-secondary/30'
                  : invoice.paymentStatus === 'Partially Paid'
                  ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {invoice.paymentStatus || 'Unpaid'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary text-neutral-950 text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-brand-secondary text-white text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body (Strictly matching sample image layout) */}
        <div id="printable-invoice" className="p-8 sm:p-12 space-y-8 font-sans text-neutral-900 bg-white">

          {/* Header Row: Logo & Invoice Title */}
          <div className="flex items-start justify-between border-b border-neutral-200 pb-8">
            {/* Left: Studio Logo & Address */}
            <div className="space-y-5">
              <img src="/logo.png" alt="NT STUDIO Logo" className="h-36 w-auto object-contain" />
              <div className="space-y-0.5">
                <h2 className="text-sm font-bold font-sans text-neutral-900">NT STUDIO</h2>
                <p className="text-sm text-neutral-600 font-sans">SriLanka</p>
                <p className="text-sm text-neutral-600 font-sans">tharindu.6273@gmail.com</p>
              </div>
            </div>

            {/* Right: Invoice # & Balance Due */}
            <div className="text-right space-y-2 pt-4">
              <h1 className="text-4xl font-normal tracking-tight text-neutral-900 font-sans">INVOICE</h1>
              <p className="text-sm font-bold text-neutral-600 font-sans"># {invoice.invoiceNumber || 'INV-026'}</p>
              <div className="pt-4">
                <span className="text-xs text-neutral-900 font-bold block font-sans">Balance Due</span>
                <span className="text-xl font-bold text-neutral-900 font-sans">
                  LKR{balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Meta Information Grid */}
          <div className="grid grid-cols-2 gap-6 text-sm border-b border-neutral-200 pb-6 pt-2">
            <div className="pt-6">
              <h3 className="text-sm font-bold text-neutral-900 font-sans">{invoice.clientName || 'Kasun Malaka'}</h3>
              {invoice.clientPhone && <p className="text-sm text-neutral-600 font-sans">{invoice.clientPhone}</p>}
              {invoice.clientEmail && <p className="text-sm text-neutral-600 font-sans">{invoice.clientEmail}</p>}
            </div>

            <div className="text-right space-y-2 font-sans text-sm text-neutral-700">
              <div className="flex justify-end gap-8">
                <span className="text-neutral-500">Invoice Date :</span>
                <span className="text-neutral-900 w-32">{formattedInvoiceDate}</span>
              </div>
              <div className="flex justify-end gap-8">
                <span className="text-neutral-500">Terms :</span>
                <span className="text-neutral-900 w-32">{terms}</span>
              </div>
              <div className="flex justify-end gap-8">
                <span className="text-neutral-500">Due Date :</span>
                <span className="text-neutral-900 w-32">{formattedDueDate}</span>
              </div>
            </div>
          </div>

          {/* Items Table (Strictly matching sample invoice image layout) */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-sm font-sans border-collapse">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="py-2.5 px-4 w-12 text-center font-normal">#</th>
                  <th className="py-2.5 px-4 font-normal">Description</th>
                  <th className="py-2.5 px-4 text-center w-24 font-normal">Qty</th>
                  <th className="py-2.5 px-4 text-right w-32 font-normal">Rate</th>
                  <th className="py-2.5 px-4 text-right w-36 font-normal">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-800 text-[13px]">
                {items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="py-3.5 px-4 text-center text-neutral-600">{idx + 1}</td>
                    <td className="py-3.5 px-4 text-neutral-900">{item.description}</td>
                    <td className="py-3.5 px-4 text-center">{Number(item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3.5 px-4 text-right">{Number(item.rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3.5 px-4 text-right text-neutral-900">{Number(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal & Totals Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-80 space-y-4 font-sans text-sm">
              <div className="flex justify-between text-neutral-700 px-4">
                <span>Sub Total</span>
                <span>{subTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between font-bold text-neutral-900 px-4">
                <span>Total</span>
                <span>LKR{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between bg-neutral-100 p-4 font-bold text-neutral-900">
                <span>Balance Due</span>
                <span>LKR{balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-8 border-t border-neutral-200 text-xs text-neutral-500 font-mono space-y-4">
            <p>Thanks for your business.</p>
            <div className="text-center text-[10px] text-neutral-400 pt-4">
              NS STUDIO • Photography & Films • Gampaha, Sri Lanka
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
