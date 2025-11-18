import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
} from "react-icons/fa";
import { 
  FiChevronRight,
  FiChevronDown
} from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettingsStore, languages, currencies } from "@/store/settingsStore";
import { useTranslation } from "@/hooks/useTranslation";
import { DashedSeparator } from "./DashedSeparator";
import { Button } from '@/components/ui/button';

export function Footer() {
  const { language, currency, setLanguage, setCurrency } = useSettingsStore();
  const { t } = useTranslation();
  const isRTL = language.code === 'ar';
  return (
    <footer 
      className="flex flex-col items-center gap-[72px]" 
      style={{ 
        backgroundColor: '#F2F2F2',
        padding: '72px 52px 32px',
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      <div className="container mx-auto w-[90%]">
        <div className="flex flex-col gap-12 pb-12 md:flex-row md:items-start md:justify-between">
          <div className="w-full md:w-[365px]">
            <div className="mb-10">
              <Logo width={180} height={60} />
            </div>

            <div className="mb-8 flex items-center gap-2 border-b border-[#666666] pb-2">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 border-0 bg-transparent text-base outline-none placeholder:text-[#787A7C]"
                style={{ 
                  color: '#141414',
                  backgroundColor: 'transparent'
                }}
              />
              <Button
                variant="primary"
                size="sm"
                className="rounded-lg px-4 py-2 !bg-black focus:ring-black"
                style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
                aria-label={t('newsletter.subscribe')}
              >
                <FiChevronRight size={20} style={{ color: '#FFFFFF' }} />
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full" aria-label="Facebook">
                <FaFacebook size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full" aria-label="Twitter">
                <FaTwitter size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full" aria-label="Instagram">
                <FaInstagram size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full" aria-label="Mail">
                <FiMail size={18} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:w-1/2 lg:grid-cols-3">
            <div>
              <h3 className="mb-4" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 600, fontSize: '14px', lineHeight: '24px', letterSpacing: '0px' }}>
                {t('footerSections.shop')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/account" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Go to My Account page">
                    {t('footerLinks.myAccount')}
                  </a>
                </li>
                <li>
                  <a href="/login" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Go to Login page">
                    {t('footerLinks.login')}
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="View your Wishlist">
                    {t('footerLinks.wishlist')}
                  </a>
                </li>
                <li>
                  <a href="/cart" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="View your Shopping Cart">
                    {t('footerLinks.cart')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 600, fontSize: '14px', lineHeight: '24px', letterSpacing: '0px' }}>
                {t('footerSections.information')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/shipping" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Read Shipping Policy">
                    {t('footerLinks.shippingPolicy')}
                  </a>
                </li>
                <li>
                  <a href="/returns" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Read Returns Policy">
                    {t('footerLinks.returns')}
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Cookie Policy">
                    {t('footerLinks.cookies')}
                  </a>
                </li>
                <li>
                  <a href="/faq" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Frequently Asked Questions">
                    {t('footerLinks.faq')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 600, fontSize: '14px', lineHeight: '24px', letterSpacing: '0px' }}>
                {t('footerSections.company')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="About Us">
                    {t('footerLinks.about')}
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Privacy Policy">
                    {t('footerLinks.privacy')}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Terms and Conditions">
                    {t('footerLinks.terms')}
                  </a>
                </li>
                <li>
                  <a href="/contact" className="transition-colors hover:text-gray-900" style={{ color: '#0B0F0E', fontFamily: 'Clash Grotesk', fontWeight: 400, fontSize: '14px', lineHeight: '22px', letterSpacing: '0px' }} aria-label="Contact Us">
                    {t('footerLinks.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="pb-12">
          <DashedSeparator />
        </div>

        {/* Bottom Section - Copyright and Language/Currency */}
        <div className="pt-12">
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: '#383838' }}>
              {t('copyright')}
            </p>
            
            <div className="flex items-center gap-4">
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: '#141414', fontFamily: 'Clash Grotesk', fontWeight: 400 }}>
                      <span>{language.flag}</span> {language.name}
                      <FiChevronDown size={14} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ backgroundColor: '#FFFFFF' }}>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang)}
                      style={{ 
                        fontFamily: 'Clash Grotesk', 
                        fontWeight: 400,
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      <span className="mr-2">{lang.flag}</span> {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Currency Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: '#141414', fontFamily: 'Clash Grotesk', fontWeight: 400 }}>
                    {currency}
                    <FiChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ backgroundColor: '#FFFFFF' }}>
                  {currencies.map((curr) => (
                    <DropdownMenuItem
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      style={{ 
                        fontFamily: 'Clash Grotesk', 
                        fontWeight: 400,
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {curr}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;