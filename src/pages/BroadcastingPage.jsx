export default function BroadcastingPage({ setCurrentPage }) {
  const broadcasters = [
    {
      name: 'Yarona FM',
      type: 'Commercial Radio',
      coverage: 'Most major towns and villages, plus online streaming worldwide',
      notes: 'One of Botswana\'s leading commercial radio stations.',
    },
    {
      name: 'Duma FM',
      type: 'Commercial Radio',
      coverage: 'Most major towns and villages, plus online streaming worldwide',
      notes: 'Commercial radio station serving Botswana audiences.',
    },
    {
      name: 'Gabz FM',
      type: 'Commercial Radio',
      coverage: 'Most major towns and villages, plus online streaming worldwide',
      notes: 'Commercial radio broadcaster based in Gaborone.',
    },
    {
      name: 'eBotswana',
      type: 'Television',
      coverage: 'Terrestrial within 60km of Gaborone; satellite expansion planned for national coverage',
      notes: 'Currently broadcasting terrestrially within the greater Gaborone area with plans for nationwide satellite expansion.',
    },
  ];

  const licenceCategories = [
    {
      title: 'Commercial Broadcasting',
      description: 'Licences granted to commercial entities providing radio or television broadcasting services for profit, subject to content requirements and local artist promotion obligations.',
    },
    {
      title: 'Subscription Management Services',
      description: 'BOCRA regulates entities that manage subscription broadcasting services, ensuring compliance with licensing conditions and consumer protection standards.',
    },
    {
      title: 'Re-broadcasting',
      description: 'The retransmission of broadcasting content is regulated by BOCRA, with specific authorisation required. State broadcasting services are excluded from BOCRA\'s mandate.',
    },
    {
      title: 'Satellite Broadcasting',
      description: 'Satellite delivery of broadcasting content requires specific BOCRA authorisation. eBotswana is planning satellite expansion to achieve national coverage.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#D4A017] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-yellow-100 font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Broadcasting</h1>
          <p className="text-yellow-50 max-w-2xl text-lg">
            BOCRA is mandated by the Communications Regulatory Authority Act to regulate all broadcasting, subscription management services, and re-broadcasting activities in Botswana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* Mandate */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Regulatory Mandate</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            BOCRA is mandated by the <strong>Communications Regulatory Authority Act (CRA Act)</strong> to regulate all broadcasting, subscription management services, and re-broadcasting activities in Botswana. State broadcasting services are excluded from BOCRA's mandate.
          </p>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Licensed broadcasters must comply with content requirements specified in their licence conditions, including mandatory percentages of local content. Broadcasters are required to promote music tracks by local artists, supporting Botswana's creative sector.
          </p>
        </section>

        {/* Licensed Broadcasters */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Licensed Broadcasters</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {broadcasters.map((b) => (
              <div key={b.name} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#002B7F] text-lg">{b.name}</h3>
                    <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{b.type}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-700 min-w-fit">Coverage:</span>
                    <span>{b.coverage}</span>
                  </div>
                  <p>{b.notes}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-3">
            * Commercial radio stations operate in most major towns and villages across Botswana, with online transmission extending global reach.
          </p>
        </section>

        {/* Licence Categories */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">Broadcasting Licence Categories</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {licenceCategories.map((cat) => (
              <div key={cat.title} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <h3 className="font-bold text-[#002B7F] mb-2">{cat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content Requirements */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">Content Requirements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Local Content Obligations</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                All licensed broadcasters in Botswana are required to meet minimum local content thresholds specified in their licence conditions. This includes:
              </p>
              <ul className="space-y-2">
                {[
                  'Mandatory promotion of music tracks by local Botswana artists',
                  'Minimum percentage of locally produced programming',
                  'Regular monitoring and reporting on local content compliance',
                  'Penalties for non-compliance with local content obligations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">National Broadcasting Audience Survey</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                BOCRA provides the <strong>National Broadcasting Board Audience Survey</strong> report, which documents the broadcasting sector landscape in Botswana and provides audience research data to guide policy and regulation.
              </p>
              <a
                href="https://www.bocra.org.bw/broadcasting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#D4A017] text-white rounded-lg text-sm font-medium hover:bg-[#1a4a9e] transition-colors"
              >
                View Audience Survey Report
              </a>
            </div>
          </div>
        </section>

        {/* Apply CTA */}
        <section className="bg-[#D4A017] text-white rounded-xl p-8">
          <h2 className="text-xl font-bold mb-2">Apply for a Broadcasting Licence</h2>
          <p className="text-blue-200 mb-4 leading-relaxed">
            Entities wishing to provide broadcasting services in Botswana must obtain the appropriate licence from BOCRA. Contact us or use the online licensing portal to begin your application.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentPage('licensing')}
              className="px-5 py-2.5 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors text-sm"
            >
              Apply Online
            </button>
            <a
              href="mailto:info@bocra.org.bw"
              className="px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              Email: info@bocra.org.bw
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
