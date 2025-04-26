'use client'

// Packages:
import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import { ScrollArea } from '@/components/ui/scroll-area'

// Functions:
const Harmony = () => {
  // Effects:
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://www.instagram.com/embed.js'
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Return:
  return (
    <>
      <CustomHead
        title='Harmony - Dirag Biswas'
        description='what if the flow state is supposed to be our default mode of being?'
        image={{
          square: 'https://diragb.dev/blog/harmony/cover.png',
          rectangle: 'https://diragb.dev/blog/harmony/cover.png',
        }}
      />
      <ScrollArea className='w-screen h-screen'>
        <div className={cn('flex items-center flex-col w-screen min-h-screen pt-[20vh] pb-28', ubunto_mono.className)}>
          <div className='w-11/12 sm:w-[596px]'>
            <div className='flex flex-col gap-2 w-full'>
              <div
                className='text-5xl text-rose-600 uppercase'
                style={{
                  letterSpacing: '-1px',
                  fontFamily: 'VCR-OSD-Mono',
                }}
              >
                harmony
              </div>
              <div className='text-xs leading-4'>On 31st March, 2025</div>
              <div className='text-sm leading-5'>
                i think the harmony between the intellect/mind and the intuition/body is what leads to higher efficiency states of being.<br />
                <br />
                further, it does not matter how intelligent or intuitive an individual is, as long as the ratio is balanced, the individual will flourish and be happy.<br />
                <br />
                <span className='text-lg font-semibold'>the balance that governs everything</span><br/>
                &quot;what if the <span className='italic'>flow state</span> is supposed to be our default mode of being?&quot;<br />
                <br />
                there&apos;s an interesting alchemy that happens when the intellect/mind and the intuition/body stop fighting and start working in sync.<br />
                <br />
                perhaps it&apos;s the key to real efficiency, to feeling <span className='italic'>alive</span>, to being unstoppable.<br />
                <br/>
                and it&apos;s not about how smart or intuitive you are, it&apos;s about how well-balanced these forces are. when they&apos;re in harmony, you flourish. when they&apos;re out of sync, life tends to become an uphill battle.<br />
                <br />
                <span className='text-lg font-semibold'>why everything feels off</span><br/>
                modernity is an assault on this intellect-to-intuition ratio. people live in their heads, overanalyzing every decision, disconnected from their instincts. others operate purely on impulse, chasing dopamine hits without thinking ahead.
                obviously, neither extreme works.<br />
                <br />
                people seem unable to bridge the gap between their intellect and intuition, nor can they fully shun either aspect and remain fully functional.<br />
                <br />
                if you&apos;re stuck in your head, you second-guess everything, spiral into anxiety, and struggle to take action. on the other hand, if you&apos;re ruled by your instincts, you&apos;re reckless, undisciplined, and often regretful.<br />
                <br />
                both lead to suffering: bad relationships where logic picks someone but instinct rejects them (or vice versa), chronic stress from an endless war between ambition and inertia, failed dreams and the sting of
                unmet potential because discipline without passion (or vice versa) is unsustainable.<br />
                <br />
                life turns into a mess of hesitation, missed opportunities, and self-sabotage. sadly, i know a lot more people than i should that live this reality.<br />
                <br />
                i think this is why so many people feel trapped. they can&apos;t fully trust their intellect (it overthinks), nor their intuition (it&apos;s unpredictable).<br />
                <br />
                the result? paralysis. procrastination. regret.<br />
                <br />
                the self-doubt mechanism ossifies into permanent inaction. most people, i think, will continue to live (read: survive) like this until they die, never really realizing that they&apos;ve been fighting themselves the entire time.<br />
                <br />
                <span className='text-lg font-semibold'>you can&apos;t reason your way out of this</span><br/>
                here&apos;s the fun part: you can&apos;t <span className='italic font-semibold'>think</span> your way out of this imbalance. you can&apos;t intellectualize yourself into confidence, or analyze your way out of anxiety.
                it simply doesn&apos;t work that way.<br />
                <br />
                the same way you can&apos;t deadlift your way into business success, you can&apos;t reason your way into trusting yourself and the world around you.<br/>
                <br />
                <img
                  src='/blog/harmony/a-beautiful-mind.jpg'
                  alt='scene from the movie &quot;a beautiful mind&quot; where dr. rosen tells john nash that he cannot reason his way out of his problem because his mind is where the problem is in the first place.'
                />
                <span className='flex justify-center w-full mt-2 text-xs text-slate-600'>source: a beautiful mind (2001)</span>
                <br />
                think about it: if your mind doesn&apos;t trust your body (seeks absolute control), and your body doesn&apos;t trust your mind (resists, avoids, numbs itself).. how do you even begin rebuilding that trust?<br />
                <br />
                perhaps not with more words, not with more overthinking.<br />
                <br />
                but with <span className='italic font-semibold'>action</span>.<br />
                <br />
                <span className='text-lg font-semibold'>the trust fall</span><br/>
                here i am inclined to believe that it must be the intellect/mind that starts the process with a trust fall - it has the power of language, of planning ahead, of seeing long-term consequences.<br />
                <br />
                but it has to stop trying to control everything.<br />
                <br />
                instead, it must take a leap of faith: <span className='font-semibold'>like taming a feral cat</span>. you can&apos;t reason with it, you can&apos;t force it into submission or compliance.<br />
                <br />
                you have to act in a way that builds trust, <span className='font-semibold'>even when it feels illogical</span>.<br />
                <br />
                <img
                  src='/blog/harmony/cat-sniffing-hand.png'
                  alt='a white stray cat sniffing the hand of the photographer.'
                />
                <br />
                so what is the trust fall?<br />
                <br />
                it&apos;s the same trite set of ideas that you&apos;ve been hearing about since you were a kid. only this time, we&apos;re looking at it from the perspective of the mind focusing on housekeeping, rather than &quot;improving&quot; its own self.<br />
                <br />
                start doing things that don&apos;t immediately make sense to your rational mind, but serve your body&apos;s well-being.<br />
                <br/>
                <ul className='list-disc ml-4'>
                  <li>move every day, even when you&apos;re busy working on a project.</li>
                  <li>eat better and healthy foods, not because of guilt, but because your body deserves good fuel.</li>
                  <li>go outside, <a target='_blank' href='https://preview.redd.it/had-a-dream-that-elon-musk-ordered-every-twitter-user-to-go-v0-0dem7anbkbx91.jpg?width=892&format=pjpg&auto=webp&s=6068124d38032dca4cc7ca738ed3370611ffede4' className='font-semibold underline text-emerald-700 transition-all'>touch grass</a>, let sunlight hit your skin.</li>
                  <li>breathe deeply, even when your thoughts are racing.</li>
                  <li>sleep early, even if you think you can get more work done at night.</li>
                  <li>engage with the physical universe. lift, dance, swim. something that makes you feel alive.</li>
                </ul>
                <br />
                <span className='font-semibold'>choose hard things on purpose. discomfort is the price of a stronger connection between intellect and instinct.</span><br />
                <br />
                <span className='text-lg font-semibold'>harmony</span><br/>
                you&apos;ll know when the mind and body are in sync. decisions become easier because intuition and logic work together. confidence is no longer forced, it&apos;s natural.<br />
                <br />
                the rigidity of your being is wholly transmutated into the state of flow, like a lodestone that has every magnetic domain in sync with one another.<br />
                <br />
                <img
                  src='/blog/harmony/tao-te-ching.png'
                  alt='a white stray cat sniffing the hand of the photographer.'
                />
                <span className='flex justify-center w-full mt-2 text-xs text-slate-600'>an excerpt from tao te ching, by lao tzu</span>
                <br />
                most people will spend their whole lives fighting themselves, trapped in an endless war between thinking and feeling. but if you can bridge the gap — if you can teach your mind to trust your body, and your body to
                trust your mind — you&apos;ll operate on a different level. you&apos;ll be free.<br />
                <br />
                <span className='font-semibold'>and that&apos;s where the magic happens.</span><br />
                <br />
                dirag biswas
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

// Exports:
export default Harmony
