export default function TelecomPage({ setCurrentPage }) {
  const operators = [
    {
      name: 'Botswana Telecommunications Corporation Limited (BTCL)',
      services: 'Fixed and Mobile services',
      type: 'Public Telecommunications Operator',
      notes: 'The incumbent operator providing both fixed-line and mobile services across Botswana.',
    },
    {
      name: 'Mascom Wireless Botswana',
      services: 'Mobile services',
      type: 'Public Telecommunications Operator',
      notes: 'One of Botswana\'s leading mobile network operators.',
    },
    {
      name: 'Orange Botswana',
      services: 'Mobile services',
      type: 'Public Telecommunications Operator',
      notes: 'Mobile network operator providing voice, data and digital services.',
    },
    {
      name: 'Botswana Fibre Networks (BoFiNet)',
      services: 'Wholesale infrastructure',
      type: 'Wholesale Infrastructure Provider',
      notes: 'Provides wholesale broadband and backbone infrastructure services. Operating under an interim licence since April 2013.',
    },
  ];

  const licenceTypes = [
    'Aircraft Radio Licence',
    'Amateur Radio Licence',
    'Broadcasting Licence',
    'Cellular Licence',
    'Citizen Band Radio Licence',
    'Point-to-Multipoint Licence',
    'Point-to-Point Licence',
    'Private Radio Communication Licence',
    'Radio Dealers Licence',
    'Radio Frequency Licence',
    'Satellite Service Licence',
    'Type Approval',
    'Value Added Network Services (VANS) Licence',
  ];

  const liberalised = [
    { service: 'Voice over Internet Protocol (VoIP)', status: 'Fully Liberalised', detail: 'Any licensed provider may offer VoIP services.' },
    { service: 'Value Added Network Services (VANS)', status: 'Licensed', detail: 'VANS providers operate in private networks under BOCRA licence.' },
    { service: 'Terminal Equipment Sales', status: 'Fully Liberalised', detail: 'No licence required to sell terminal equipment.' },
    { service: 'Radio Equipment', status: 'Type Approval Required', detail: 'Vendors must obtain BOCRA type approval before selling radio equipment.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0057A8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-blue-200 font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Telecommunications</h1>
          <p className="text-blue-100 max-w-2xl text-lg">
            BOCRA regulates Botswana's telecommunications sector under the Communications Regulatory Authority Act 2012, covering spectrum, numbering, licensing and consumer protection.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Overview */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Regulatory Overview</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            BOCRA regulates Botswana's telecommunications sector under the <strong>Communications Regulatory Authority Act 2012</strong>, operating within guidelines from the <strong>1995 Telecommunication Policy</strong>. The authority oversees radio frequency management, national numbering plans, frequency allocation, equipment type approval and consumer protection.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl mt-4">
            In September 2015, BOCRA implemented a new converged ICT licensing framework, replacing the previous sector-specific licensing approach with two primary licence categories: the <strong>Network Facilities Provider (NFP)</strong> licence and the <strong>Services and Applications Provider (SAP)</strong> licence.
          </p>
        </section>

        {/* Operators */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Market Structure — Public Telecommunications Operators</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {operators.map((op) => (
              <div key={op.name} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#002B7F]">{op.name}</h3>
                    <span className="text-xs text-gray-500 font-medium">{op.type}</span>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded whitespace-nowrap ml-2">{op.services}</span>
                </div>
                <p className="text-gray-600 text-sm">{op.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Licensing Framework */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#002B7F] mb-4">Converged Licensing Framework (2015)</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#002B7F] pl-4">
                <h3 className="font-bold text-[#002B7F]">Network Facilities Provider (NFP)</h3>
                <p className="text-gray-600 text-sm mt-1">Entities owning or operating physical infrastructure — fixed links, radio transmitters, satellites, cables, towers, switches and base stations — for service delivery or commercial availability.</p>
              </div>
              <div className="border-l-4 border-[#2DD4BF] pl-4">
                <h3 className="font-bold text-[#002B7F]">Services & Applications Provider (SAP)</h3>
                <p className="text-gray-600 text-sm mt-1">Non-infrastructure providers delivering specific functions to end users through speech, data, text or images, excluding broadcasting content services.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#002B7F] mb-4">Available Licence Types</h2>
            <ul className="space-y-1.5">
              {licenceTypes.map((lt) => (
                <li key={lt} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057A8] flex-shrink-0"></span>
                  {lt}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setCurrentPage('licensing')}
              className="mt-4 w-full py-2 bg-[#0057A8] text-white rounded-lg font-medium hover:bg-[#1a4a9e] transition-colors text-sm"
            >
              Apply for a Licence
            </button>
          </div>
        </section>

        {/* Liberalised Services */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Market Liberalisation Status</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0057A8] text-white">
                  <th className="text-left px-5 py-3 font-semibold">Service</th>
                  <th className="text-left px-5 py-3 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {liberalised.map((row, i) => (
                  <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-3 font-medium text-gray-800">{row.service}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        row.status === 'Fully Liberalised' ? 'bg-green-100 text-green-700' :
                        row.status === 'Licensed' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{row.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Consumer Protection */}
        <section className="bg-[#0057A8] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-3">Consumer Protection</h2>
          <p className="text-blue-200 leading-relaxed mb-4">
            BOCRA investigates consumer complaints against telecommunications service providers where sufficient evidence is provided. Complaints may relate to billing disputes, service failures, interconnection issues, mobile service problems, and internet contracts.
          </p>
          <button
            onClick={() => setCurrentPage('complaints')}
            className="px-5 py-2.5 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors text-sm"
          >
            File a Complaint
          </button>
        </section>

      </div>
    </div>
  );
}
