interface ScreenInstructionProps {
  children: React.ReactNode
  className?: string
}

const ScreenInstruction = ({ 
  children, 
  className = "text-base mb-6" 
}: ScreenInstructionProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default ScreenInstruction