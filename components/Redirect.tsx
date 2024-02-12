"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Redirect() {
    const router = useRouter()

    useEffect(() => {
        router.push("/login")
    }, [router])

  return (
    <></>
  )
}

export default Redirect