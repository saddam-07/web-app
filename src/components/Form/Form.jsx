import React, { useCallback, useEffect, useState } from "react";
import './Form.css'
import { useTelegram } from "../../hooks/useTelegram";

function Form() {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data))
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])

    function onChangeCountry(e) {
        setCountry(e.target.value)
    }

    function onChangeStreet(e) {
        setStreet(e.target.value)
    }

    function onChangeSubject(e) {
        setSubject(e.target.value)
    }

    return(
        <div className="form">
            <h1>Введите вашы данные</h1>
            <input type="text" className="input" placeholder="Страна" value={country} onChange={onChangeCountry}/>
            <input type="text" className="input" placeholder="Улица" value={street} onChange={onChangeStreet}/>

            <select className="select" value={subject} onChange={onChangeSubject}>
                <option value="physical">Физ. лицо</option>
                <option value="legal">Юр. лицо</option>
            </select>
        </div>
    )
}

export default Form;