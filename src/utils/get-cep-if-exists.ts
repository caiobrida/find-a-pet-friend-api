const cepApiUrl = 'https://viacep.com.br/ws/'

export async function getCepIfExists(cep: string) {
  const res = await fetch(`${cepApiUrl}/${cep}/json`)

  const jsonRes = await res.json()

  if (jsonRes.erro) {
    return null
  }

  return { address: jsonRes }
}
