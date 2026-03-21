import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#002B7F] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">BOCRA</h2>
                <p className="text-xs text-gray-400">Regulating Communications</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The Botswana Communications Regulatory Authority (BOCRA) is responsible for regulating the communications sector in Botswana.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">About BOCRA</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Licensing</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Consumer Protection</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Spectrum Management</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Type Approval</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Publications</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Online Licensing</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">File a Complaint</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Stolen Device Check</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Tariff Comparison</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">License Renewal</a></li>
              <li><a href="#" className="hover:text-[#2DD4BF] transition-colors">Compliance Reports</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5 text-[#2DD4BF]" />
                <span>BOCRA Headquarters<br />Private Bag 00495<br />Gaborone, Botswana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-[#2DD4BF]" />
                <span>+267 368 5000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-[#2DD4BF]" />
                <span>info@bocra.bw</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 BOCRA. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
