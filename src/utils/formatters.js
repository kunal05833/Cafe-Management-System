export { formatDate, formatCurrency } from './helpers';

export const formatOrderStatus = (status) => {
  const m = { pending:'Pending', preparing:'Preparing', ready:'Ready for Pickup', delivered:'Delivered', cancelled:'Cancelled' };
  return m[status] || status;
};
export const formatPaymentType = (t) => ({ cash:'Cash Payment', udhari:'Udhari (Credit)', online:'Online Payment' }[t] || t);
export const formatCategory = (c) => ({ coffee:'Coffee', snacks:'Snacks', desserts:'Desserts', beverages:'Beverages' }[c] || c);

export const formatFileSize = (b) => {
  if (!Number.isFinite(b) || b <= 0) return '0 Bytes';
  const k=1024, sizes=['Bytes','KB','MB','GB'], i=Math.floor(Math.log(b)/Math.log(k));
  return `${parseFloat((b/Math.pow(k,i)).toFixed(2))} ${sizes[i]}`;
};
export const formatPhoneNumber = (p) => { if (!p) return ''; const c=p.replace(/\D/g,''); return c.length!==10?p:`+91 ${c.slice(0,3)} ${c.slice(3,6)} ${c.slice(6)}`; };
export const formatAddress = (a) => !a ? '' : [a.line1,a.line2,a.city,a.state,a.pincode].filter(Boolean).join(', ');
export const formatDuration = (m) => (!Number.isFinite(m)?'': m<60?`${m} min`:`${Math.floor(m/60)}h ${m%60}m`);
export const formatPercentage = (v,d=1)=>`${(Number.isFinite(v)?v:0).toFixed(d)}%`;
export const formatOrderItems = (items=[])=> items.map(i=>`${i.name} x${i.quantity}`).join(', ');
export const formatDateRange = (s,e)=>{ try{ const S=new Date(s), E=new Date(e); return `${S.toLocaleDateString('en-IN',{month:'short',day:'numeric'})} - ${E.toLocaleDateString('en-IN',{month:'short',day:'numeric',year:'numeric'})}`; }catch{return '';} };