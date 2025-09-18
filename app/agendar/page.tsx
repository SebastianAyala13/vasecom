import BookingForm from "../components/BookingForm";

export default function Page() {
  const calendarSrc = process.env.NEXT_PUBLIC_PUBLIC_CALENDAR_IFRAME_SRC as string;
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📅 Agenda tu Cita</h1>
              <p className="text-gray-600 mt-1">
                Consultoría personalizada con Sebastian y Valentina - VASECOM
              </p>
            </div>
            <div className="hidden md:block">
              <img src="/VASECOM.png" alt="VASECOM" className="h-12" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4">
        
        {/* Información importante */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Consultoría Especializada</h3>
            <p className="text-sm text-gray-600">
              Estrategias de ecommerce, desarrollo full-stack y transformación digital
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Respuesta Rápida</h3>
            <p className="text-sm text-gray-600">
              Confirmación inmediata por email y WhatsApp
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-2xl mb-2">💎</div>
            <h3 className="font-semibold text-gray-800 mb-2">100% Gratuito</h3>
            <p className="text-sm text-gray-600">
              Primera consultoría sin costo para evaluar tu proyecto
            </p>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-green-50 to-blue-50">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                📊 Disponibilidad en Tiempo Real
              </h2>
              <p className="text-gray-600 text-sm">
                Consulta nuestra agenda y selecciona el horario que mejor te convenga
              </p>
            </div>
            
            <div className="p-4">
              {calendarSrc ? (
                <iframe
                  src={calendarSrc}
                  style={{ border: 0, width: "100%", height: "650px" }}
                  className="rounded-lg"
                  title="Calendario de disponibilidad VASECOM"
                />
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="text-yellow-800 font-semibold mb-2">
                    Configuración de Calendar Faltante
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    La variable NEXT_PUBLIC_PUBLIC_CALENDAR_IFRAME_SRC no está configurada.
                    <br />
                    Por favor, configura el archivo .env.local con la URL del calendario público.
                  </p>
                  <div className="mt-4 text-xs text-yellow-600 bg-yellow-100 p-3 rounded border">
                    <strong>Ejemplo:</strong><br />
                    NEXT_PUBLIC_PUBLIC_CALENDAR_IFRAME_SRC=https://calendar.google.com/calendar/embed?src=TU_CALENDAR_ID&ctz=America/Bogota
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🚀 Completa tu Reserva
            </h2>
            <p className="text-gray-600">
              Llena el formulario y confirma tu cita al instante
            </p>
          </div>
          
          <BookingForm />
        </div>

        {/* Contact alternatives */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            💬 Otras formas de contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://wa.me/573107736703?text=Hola%20Sebastian,%20quiero%20agendar%20una%20consultoría"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors group"
            >
              <div className="text-2xl mr-3">💻</div>
              <div>
                <div className="font-semibold text-gray-800 group-hover:text-green-800">
                  Sebastian Ayala
                </div>
                <div className="text-sm text-gray-600">
                  CEO & Full Stack Developer
                </div>
              </div>
            </a>
            
            <a
              href="https://wa.me/573123168898?text=Hola%20Valentina,%20quiero%20agendar%20una%20consultoría"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors group"
            >
              <div className="text-2xl mr-3">👩‍💼</div>
              <div>
                <div className="font-semibold text-gray-800 group-hover:text-pink-800">
                  Valentina Rios
                </div>
                <div className="text-sm text-gray-600">
                  CEO & Co-fundadora
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            🔒 Tu información está segura • ⚡ Respuesta en menos de 24 horas • 💎 Primera consultoría gratuita
          </p>
        </div>
      </div>
    </main>
  );
}
