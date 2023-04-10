import React from 'react'

interface ProgressSVGProps {
  progress: number
  radius: number
  stroke: number
  courseTotal: number
}

const ProgressSVG: React.FC<ProgressSVGProps> = ({
  progress,
  courseTotal,
  radius,
  stroke,
}) => {
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset =
    circumference - (progress / courseTotal) * circumference

  const getPercentage = () => {
    return Math.round((progress / courseTotal) * 100)
  }

  return (
    <div className="inline-flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2}>
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={1}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          strokeWidth={2.5}
          stroke={'#00BFA6'}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset ? strokeDashoffset : 0}
        />
      </svg>
      <span className="absolute text-sm">{`${getPercentage()}%`}</span>
    </div>
  )
}

export default ProgressSVG
