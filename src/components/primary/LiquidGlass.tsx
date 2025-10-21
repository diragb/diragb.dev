// Packages:
import React from 'react'
import { cn } from '@/lib/utils'

// Functions:
const LiquidGlass = ({
  children,
  wrapperClassName,
}: {
  children: React.ReactNode
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className']
}) => {
  return (
    <>
      <svg style={{ display: 'none' }}>
        <filter
          id='glass-distortion'
          x='0%'
          y='0%'
          width='100%'
          height='100%'
          filterUnits='objectBoundingBox'
        >
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.01 0.01'
            numOctaves='1'
            seed='5'
            result='turbulence'
          />
          <feComponentTransfer in='turbulence' result='mapped'>
            <feFuncR type='gamma' amplitude='1' exponent='10' offset='0.5' />
            <feFuncG type='gamma' amplitude='0' exponent='1' offset='0' />
            <feFuncB type='gamma' amplitude='0' exponent='1' offset='0.5' />
          </feComponentTransfer>

          <feGaussianBlur in='turbulence' stdDeviation='3' result='softMap' />

          <feSpecularLighting
            in='softMap'
            surfaceScale='5'
            specularConstant='1'
            specularExponent='100'
            lightingColor='white'
            result='specLight'
          >
            <fePointLight x='-200' y='-200' z='300' />
          </feSpecularLighting>

          <feComposite
            in='specLight'
            operator='arithmetic'
            k1='0'
            k2='1'
            k3='1'
            k4='0'
            result='litImage'
          />

          <feDisplacementMap
            in='SourceGraphic'
            in2='softMap'
            scale='150'
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>
      </svg>
      <div
        className={cn(
          'relative flex overflow-hidden shadow-[0_6px_6px_rgba(0,0,0,0.2),_0_0_20px_rgba(0,0,0,0.1)]',
          wrapperClassName
        )}
      >
        <div className='absolute z-[0] inset-0 backdrop-blur-[3px] overflow-hidden isolate' style={{ filter: 'url(#glass-distortion)' }} />
        <div className='absolute z-[1] inset-0 bg-[rgba(255,255,255,0.25)]' />
        <div className='absolute z-[2] inset-0 overflow-hidden shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.5)]' />
        <div className='absolute z-[3]'>
          {children}
        </div>
      </div>
    </>
  )
}

// Exports:
export default LiquidGlass
