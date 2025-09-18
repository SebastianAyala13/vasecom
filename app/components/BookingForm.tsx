"use client";
import { useState } from "react";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const missingEnv = !WEBHOOK_URL;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!WEBHOOK_URL) {
      setMsg("⚠️ Falta configurar NEXT_PUBLIC_WEBHOOK_URL.");
      return;
    }
    setLoading(true);
    setMsg(null);

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      date: String(fd.get("date") || "").trim(),          // YYYY-MM-DD
      startTime: String(fd.get("time") || "").trim(),     // HH:mm (24h)
      durationMinutes: Number(fd.get("duration") || 30),
      notes: String(fd.get("notes") || "").trim(),
    };

    // Validaciones front simples
    if (!payload.name || !payload.email || !payload.date || !payload.startTime) {
      setMsg("⚠️ Por favor completa los campos obligatorios.");
      setLoading(false);
      return;
    }
    if (payload.durationMinutes < 15) payload.durationMinutes = 15;

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setMsg("✅ Cita agendada. Te enviamos confirmación por correo.");
        form.reset();
      } else {
        setMsg(`⚠️ ${data.error || "No se pudo agendar. Intenta otro horario."}`);
      }
    } catch (err: any) {
      setMsg(`❌ Error de red: ${err?.message || "Intenta nuevamente."}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full">
      {missingEnv && (
        <div className="mb-3 rounded-lg border border-yellow-500 bg-yellow-50 p-3 text-sm">
          Falta configurar <b>NEXT_PUBLIC_WEBHOOK_URL</b> en <code>.env.local</code>.
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4 p-4 rounded-2xl border">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input 
              id="name"
              name="name" 
              required 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input 
                id="email"
                type="email" 
                name="email" 
                required 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input 
                id="phone"
                name="phone" 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
                placeholder="+57 300 123 4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha *
              </label>
              <input 
                id="date"
                type="date" 
                name="date" 
                required 
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Hora *
              </label>
              <input 
                id="time"
                type="time" 
                name="time" 
                required 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duración (minutos)
            </label>
            <select
              id="duration"
              name="duration" 
              defaultValue={30}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value={15}>15 minutos - Consulta rápida</option>
              <option value={30}>30 minutos - Consultoría estándar</option>
              <option value={45}>45 minutos - Consultoría extendida</option>
              <option value={60}>60 minutos - Sesión completa</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales
            </label>
            <textarea 
              id="notes"
              name="notes" 
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
              rows={3}
              placeholder="Cuéntanos sobre tu proyecto, objetivos o preguntas específicas..."
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 font-semibold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Agendando...
              </span>
            ) : (
              "🚀 Agendar Cita"
            )}
          </button>

          {msg && (
            <div className={`p-4 rounded-lg text-sm font-medium ${
              msg.includes('✅') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {msg}
            </div>
          )}
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            ¿Prefieres contacto directo? 
            <a 
              href="https://wa.me/573107736703?text=Hola%20Sebastian,%20quiero%20agendar%20una%20cita" 
              className="text-green-600 hover:text-green-700 font-medium ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Sebastian
            </a> o 
            <a 
              href="https://wa.me/573123168898?text=Hola%20Valentina,%20quiero%20agendar%20una%20cita" 
              className="text-green-600 hover:text-green-700 font-medium ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Valentina
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
