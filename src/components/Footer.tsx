import { Blocks } from "lucide-react";

function Footer() {
  return (
    <footer className="py-4 mt-4 border-t border-gray-800/30">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>
            This is a mini project I made to test out clerk, convex, piston, and
            local storage stuff. It&apos;ll probably break eventually but you
            should be able to use both python and js
          </span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
