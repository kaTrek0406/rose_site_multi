import { useEffect } from 'react';

const ALLOWED_PREFIXES = ['60','65','67','68','69','78','79'];

// Нормализуем только цифры
const digitsOnly = (s) => (s || '').replace(/\D+/g, '');

export default function PhoneMD({ value, onChange, required=false, error, className }) {
  // value — только 8 цифр ПОСЛЕ +373
  const v = digitsOnly(value).slice(0, 8);
  const first2 = v.slice(0, 2);
  const rest6  = v.slice(2);

  const isPrefixOk = v.length >= 2 ? ALLOWED_PREFIXES.includes(first2) : true;
  const isLenOk    = v.length === 8;
  const isValid    = isPrefixOk && isLenOk;

  useEffect(() => {
    if (digitsOnly(value) !== v) {
      onChange?.(v); // подрезаем лишнее, если что-то залетело
    }
  }, [value]);

  const handleInput = (e) => {
    const next = digitsOnly(e.target.value).slice(0, 8);
    onChange?.(next);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    const next = digitsOnly(text).slice(0, 8);
    onChange?.(next);
  };

  return (
    <div className={`phone-md ${className || ''}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        aria-hidden="true"
        style={{
          padding: '10px 12px',
          background: 'var(--input-bg, #f5f5f7)',
          border: '1px solid var(--input-border, #d9d9de)',
          borderRadius: 8,
          fontFamily: 'inherit'
        }}
      >
        +373
      </span>
      <input
        type="tel"
        inputMode="numeric"
        placeholder="60••••••"
        value={v}
        onChange={handleInput}
        onPaste={handlePaste}
        required={required}
        maxLength={8}
        pattern="^(60|65|67|68|69|78|79)\d{6}$"
        title="После +373: ровно 8 цифр. Первые две — 60, 65, 67, 68, 69, 78, 79."
        style={{
          flex: 1,
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid var(--input-border, #d9d9de)',
          background: 'var(--input-bg, #fff)',
          fontFamily: 'inherit'
        }}
      />
      {!isValid && (v.length > 0) && (
        <span style={{ color: '#d33', fontSize: 12, marginLeft: 4 }}>
          Введите 8 цифр; первые две: 60,65,67,68,69,78,79
        </span>
      )}
      {error && <span style={{ color: '#d33', fontSize: 12, marginLeft: 4 }}>{error}</span>}
    </div>
  );
}
