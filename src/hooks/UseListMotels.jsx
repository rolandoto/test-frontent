import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ServiceMotel } from '../service/ServiceListMotels'
import { setList } from '../store/slice/motelsSlice'

const UseListMotels =() =>{
    
    const dispath = useDispatch()
    const {list}=  useSelector((state) =>state.listMotel)
    
    useEffect(() =>{
        ServiceMotel().then(index =>{
            dispath(setList(index))
        }).catch((e) =>{
            console.error(e)
        })
    },[setList])

    return {
        iduser:list
    }
}

export default UseListMotels