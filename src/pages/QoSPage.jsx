export default function QoSPage() {
  const metrics = [
    { title: 'Network Availability', description: 'Tracks uptime and accessibility of telecommunications networks across Botswana.', icon: '📶' },
    { title: 'Call Setup Success Rate', description: 'Monitors the percentage of call attempts that connect successfully across all operators.', icon: '📞' },
    { title: 'Data Session Performance', description: 'Measures uplink and downlink speeds, data volumes and session reliability.', icon: '⚡' },
    { title: 'Coverage Mapping', description: 'Interactive maps showing network coverage across all regions of Botswana.', icon: '🗺️' },
    { title: 'Drive Test Analysis', description: 'Field-collected data from drive tests used to validate coverage and performance claims.', icon: '🚗' },
    { title: 'Traffic Congestion', description: 'Monitors network load and congestion levels across operator infrastructure.', icon: '📊' },
    { title: 'Cell Downtime Tracking', description: 'Records and analyses periods of cell site outages affecting service delivery.', icon: '🔴' },
    { title: 'KPI Monitoring', description: 'Key Performance Indicators tracked across multiple operators simultaneously.', icon: '📈' },
  ];

  const operators = ['BTCL', 'Mascom Wireless', 'Orange Botswana', 'BoFiNet', 'ISPs'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#002B7F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#2DD4BF] font-medium mb-2 uppercase tracking-wide text-sm">Mandate</p>
          <h1 className="text-4xl font-bold mb-4">Quality of Service (QoS) Monitoring</h1>
          <p className="text-blue-200 max-w-2xl text-lg">
            BOCRA operates a dedicated QoS monitoring platform — DQoS — to track and publish telecommunications performance data across all licensed operators in Botswana.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

        {/* About DQoS */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-4">About the DQoS Platform</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The <strong>DQoS (Data Quality of Service)</strong> platform is BOCRA's dedicated telecommunications performance monitoring system, accessible at <strong>dqos.bocra.org.bw</strong>. It provides comprehensive network quality tracking across all licensed telecommunications operators and ISPs in Botswana.
              </p>
              <p>
                The platform collects data from multiple sources including Network Management Systems (NMS), drive tests, and operator-submitted KPIs, presenting the data through interactive dashboards and coverage maps accessible to the public and regulators alike.
              </p>
              <p>
                Consumers can use the platform to check coverage in their area, conduct speed tests, and report network problems. BOCRA uses the data to enforce quality of service standards and hold operators accountable.
              </p>
            </div>
            <div className="space-y-3">
              <div className="bg-[#002B7F] text-white rounded-xl p-5">
                <h3 className="font-bold mb-2">Access the QoS Portal</h3>
                <p className="text-blue-200 text-sm mb-3">The full DQoS monitoring portal is hosted at a dedicated platform with real-time data, coverage maps and speed testing.</p>
                <a
                  href="https://dqos.bocra.org.bw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors text-sm"
                >
                  Go to dqos.bocra.org.bw →
                </a>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-bold text-[#002B7F] mb-2">Operators Monitored</h3>
                <div className="flex flex-wrap gap-2">
                  {operators.map((op) => (
                    <span key={op} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 font-medium">{op}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is monitored */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">What is Monitored</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((m) => (
              <div key={m.title} className="bg-white rounded-xl shadow-sm p-5">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="font-bold text-[#002B7F] mb-1 text-sm">{m.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Public Features */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#002B7F] mb-6">What the Public Can Access</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'QoS Dashboards', desc: 'Real-time performance metrics for all monitored operators.' },
              { title: 'Coverage Maps', desc: 'Interactive maps showing network coverage across all regions.' },
              { title: 'Speed Test', desc: 'Test your internet connection speed and compare against benchmarks.' },
              { title: 'Problem Reporting', desc: 'Submit network problem reports directly through the platform.' },
              { title: 'Location Analysis', desc: 'Check network performance for a specific location in Botswana.' },
              { title: 'FAQ & Support', desc: 'Guidance on understanding QoS data and making complaints.' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="w-2 h-2 mt-2 rounded-full bg-[#2DD4BF] flex-shrink-0"></span>
                <div>
                  <p className="font-semibold text-[#002B7F] text-sm">{f.title}</p>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#002B7F] text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Check Network Performance in Your Area</h2>
            <p className="text-blue-200">Visit the DQoS portal to see live coverage maps, KPIs and speed test results.</p>
          </div>
          <a
            href="https://dqos.bocra.org.bw"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3 bg-[#2DD4BF] text-white font-semibold rounded-lg hover:bg-teal-500 transition-colors"
          >
            Open DQoS Portal →
          </a>
        </section>

      </div>
    </div>
  );
}
