import { 
  FiMenu, 
  FiUser, 
  FiSearch 
} from "react-icons/fi";
import { Button } from '@/components/ui/button';
import { useTheme } from "@/theme/ThemeContext";
import { Logo } from "./Logo";
import { DashedSeparator } from "./DashedSeparator";
import { CartButton } from "./header/CartButton";

export function Header() {
  const { theme } = useTheme();
  
  return (
    <>
      <div className="w-full bg-white">
        <header 
          className="container mx-auto flex w-[90%] items-center justify-between py-8"
        >
        <div className="flex items-center">
          <a href="/" className="flex items-center" aria-label="Go to homepage">
            <Logo />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-lg p-2 transition-colors lg:flex focus:outline-none focus:ring-0 border-0"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </Button>

          {/* User Account */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-lg p-2 transition-colors sm:flex focus:outline-none focus:ring-0 border-0"
            aria-label="Account"
          >
            <FiUser size={20} />
          </Button>

          {/* Shopping Cart */}
          <CartButton className="rounded-lg p-2 transition-colors" />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg p-2 transition-colors sm:hidden focus:outline-none focus:ring-0 border-0"
            aria-label="Toggle menu"
          >
            <FiMenu size={20} />
          </Button>
        </div>
      </header>
      </div>
      <div className="w-full bg-white">
        <div className="container mx-auto w-[90%]">
          <DashedSeparator />
        </div>
      </div>
    </>
  );
}

export default Header;