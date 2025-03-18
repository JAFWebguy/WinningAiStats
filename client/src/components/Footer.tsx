import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mt-16 border-t border-slate-200 dark:border-cyan-500/20"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-600 dark:text-cyan-400/70">
            © 2025 WinningTheRace.App - AI Market Share Analytics
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-cyan-400/50">
            <a href="#top" className="hover:text-slate-900 dark:hover:text-cyan-400 transition-colors">
              Back to Top
            </a>
            <span>•</span>
            <a href="https://firstpagesage.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-cyan-400 transition-colors">
              Data Source
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
