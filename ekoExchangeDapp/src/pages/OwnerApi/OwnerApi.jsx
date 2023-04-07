import React from 'react'
import {Input, Button, Text} from "@nextui-org/react"
import {useState, useEffect} from "react"
import { ethers } from 'ethers'
import { useSigner } from 'wagmi'
import Navbar from '../../components/home/Navbar'
import { Notyf } from 'notyf'

import ownershipFacetz from '../../abi/OwnershipFacetAbi.json'
import viewFacetAbiz from "../../abi/ViewFacetAbi.json"
import ownerActionFacet from '../../abi/OwnerActionsFacetAbi.json'
function OwnerApi() {
  const notyf = new Notyf();
  const {data: signer} = useSigner()
  const diamAddress = '0x62853E9eBdaaF86C1835Bb959bb0A43e508a1280'
  const ownerShipFacetAbi = ownershipFacetz
  const viewFacetAbi = viewFacetAbiz
  const ownerActionAbi = ownerActionFacet
  const [isLoading, setLoading] = useState(false)
  const [newOnwerAddress, setNewOwnerAddress] = useState()
  const [currentOwner, setCurrentOwner] = useState()
  const [acceptedStable, setStables] = useState([])
  const [acceptedTokens, setAcceptedTokens] = useState([])
  const [addEkoAddress, setAddEkoAddress] = useState('')
  const [remEkoAddress, setRemEkoAddress] = useState('')
  const [addScoreTokenAddress, setAddScoreTokenAdd] = useState('')
  const [remScoreTokenAddress, setRemScoreTokenAddress] = useState('')
  const RPC = "https://data-seed-prebsc-1-s1.binance.org:8545";
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  const setNewOwner = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, ownerShipFacetAbi, signer)
      let tx = await exchange.transferOwnership(newOnwerAddress)
      setLoading(true)
      await tx.wait()
      
      notyf.success("OwnerShip transferred")
    } catch (error) {
        console.log({error})
        notyf.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const getOwner = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, ownerShipFacetAbi, provider)
      let cOwner = await exchange.owner()
      console.log({cOwner})
      setCurrentOwner(cOwner)
    } catch(error){
      console.log(error)
    }
  }

  const getStables = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, viewFacetAbi, provider)
      let stables = await exchange.getAcceptedEkoStables()
      console.log({stables})
      setStables(stables)
    } catch (error) {
      console.log(error)
    }
  }

  const getTokens = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, viewFacetAbi, provider)
      let tokens = await exchange.getAcceptedScoreTokens()
      console.log({tokens})
      setAcceptedTokens(tokens)
    } catch (error) {
      console.log(error)
    }
  }

  const addEkoStable = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, ownerActionAbi, signer)
      let tx = await exchange.addEkostable(addEkoAddress)
      setLoading(true)
      await tx.wait()
      
      notyf.success("Ekostable added succesfully")
    } catch (error) {
      console.log(error)
      notyf.error("Something went wrong")
    } finally {
      setLoading(false)

    }
  }

  const removeEkoStable = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, ownerActionAbi, signer)
      let tx = await exchange.removeEkostable(remEkoAddress)
      setLoading(true)
      await tx.wait()
      
      notyf.success("Ekostable removed succesfully")
    } catch (error) {
      console.log(error)
      notyf.error("Something went wrong")
    } finally {
      setLoading(false)

    }
  }

  const addScoreToken = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, ownerActionAbi, signer)
      let tx = await exchange.addScoreToken(addScoreTokenAddress)
      setLoading(true)
      await tx.wait()
      
      notyf.success("score Token added succesfully")
    } catch (error) {
      console.log(error)
      notyf.error("Something went wrong")
    } finally {
      setLoading(false)

    }
  }

  const removeScoreToken = async () => {
    try{
      const exchange = new ethers.Contract(diamAddress, ownerActionAbi, signer)
      let tx = await exchange.removeScoreToken(remScoreTokenAddress)
      setLoading(true)
      await tx.wait()
      
      notyf.success("ScoreToken removed succesfully")
    } catch (error) {
      console.log(error)
      notyf.error("Something went wrong")
    } finally {
      setLoading(false)

    }
  }
  return (
    <>
    <Navbar />
    <div style={{background: 'black', width:"100%"}}>
      <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                    >
                        Owner API
                </Text>
    <div style={{margin:'2%', border:'white 2px solid'}}>
          <Text
                    h1
                    size={30}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                    >
                        OwnerShip
                </Text>
              <div>
              <Input placeholder="Add new owner address" onChange={(e) => setNewOwnerAddress(e.target.value)} />
              <Button disabled={isLoading ? true : false} onClick={() => setNewOwner()}>Transfer Ownership</Button>
              </div>
              <div>
                <Button onClick={() => getOwner()}>Get Current Owner</Button>
                <p style={{color: 'white'}}>Current Owner: {currentOwner ? currentOwner : "click to fetch"}</p>
              </div>
    </div>

    <div style={{margin:'2%', border:'white 2px solid'}}>
          <Text
                    h1
                    size={30}
                    css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                    }}
                    weight="bold"
                    >
                        OwnerAction
                </Text>
              <div>
              <Button onClick={() => getStables()}>Get Accepted EkoStables</Button>
                <p style={{color: 'white'}}>accepted stables: {acceptedStable ? acceptedStable.map((stable) => {
                  return(
                    <div>{stable}</div>
                  )
                }) : "click to fetch"}</p>
              </div>
              <div>
                <Button onClick={() => getTokens()}>Get Accepted ScoreTokens</Button>
                <p style={{color: 'white'}}>Accepted Tokens: {acceptedTokens ? acceptedTokens.map((token) => {
                  return(
                    <div>{token}</div>
                  )
                }) : "click to fetch"}</p>
              </div>

              <div>
              <Input placeholder="address of new ekostable" onChange={(e) => setAddEkoAddress(e.target.value)} />
              <Button disabled={isLoading ? true : false} onClick={() => addEkoStable()}>AddEkoStable</Button>
              </div>
              <div>
              <Input placeholder="address of ekostable to remove" onChange={(e) => setRemEkoAddress(e.target.value)} />
              <Button disabled={isLoading ? true : false} onClick={() => removeEkoStable()}>Remove Ekostable</Button>
              </div>

              <div>
              <Input placeholder="address of new ekostable" onChange={(e) => setAddScoreTokenAdd(e.target.value)} />
              <Button disabled={isLoading ? true : false} onClick={() => addScoreToken()}>Add ScoreTokern</Button>
              </div>
              <div>
              <Input placeholder="address of ekostable to remove" onChange={(e) => setRemScoreTokenAddress(e.target.value)} />
              <Button disabled={isLoading ? true : false} onClick={() => removeScoreToken()}>Remove ScoreTokern</Button>
              </div>
    </div>
    </div>
    </>
  )
}

export default OwnerApi