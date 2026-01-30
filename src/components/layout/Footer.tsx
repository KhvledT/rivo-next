import  Link  from 'next/link';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-background py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Coffee className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-2xl font-bold">RIVO</span>
            </Link>
            <p className="text-background/70 max-w-sm">
              Experience premium coffee crafted with passion. Visit any of our branches for the perfect cup.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-background/70 hover:text-background transition-colors">Menu</Link></li>
              <li><Link href="/branches" className="text-background/70 hover:text-background transition-colors">Branches</Link></li>
              <li><Link href="/social" className="text-background/70 hover:text-background transition-colors">Social</Link></li>
              <li><Link href="/cart" className="text-background/70 hover:text-background transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-background/70">
              <li>+2010 0985 9330</li>
              <li>Mansoura</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center text-background/50 text-sm">
          © {new Date().getFullYear()} RIVO Café. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
