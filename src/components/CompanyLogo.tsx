export function CompanyLogo() {
  return (
    <div className="fixed top-4 left-6 z-[60] pointer-events-none">
      <img
        src="/logo.svg"
        alt="Elite AI Automations"
        width={132}
        height={28}
        className="h-6 sm:h-7 w-auto opacity-90"
      />
    </div>
  )
}
