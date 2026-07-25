import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection
