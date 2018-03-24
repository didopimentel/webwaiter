import React from 'react'

const headers = {
  'Accept': 'application/json'
}

const api = "http://localhost:3001/api"

export const signIn = (code) =>
    fetch(`${api}/establishments/${code}`, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status === 200) return res.json()
    else return { error: res.text() }
  })
