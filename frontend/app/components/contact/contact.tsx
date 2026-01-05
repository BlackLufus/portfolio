"use client";
import { useState, useEffect, ReactNode, useRef } from "react";
import loadData, { DataType } from "@/services/load_data";
import Loading from "@/widgets/loader";
import Frame from "../frame";
import LanguageManager, { LanguageCode } from "@/global/languageSubscriber";
import { sendContactMessage } from "@/services/sendContactMessage";

interface ContactLinkData {
    title: string;
    tag: string;
    url: string;
}

interface ContactData {
    title: string;
    description: string;
    contact_title: string;
    contact_description: string;
    github: ContactLinkData;
    linkedin: ContactLinkData;
    xing: ContactLinkData;
    form_title: string;
    form_name: string;
    form_name_error_message: string;
    form_email_error_message: string;
    form_email: string;
    form_message_error_message: string;
    form_message: string;
    form_submit: string;
    form_response_success: string;
    form_response_error: string;
}

export interface ContactConfig {
    title: string;
    icon: string;
}

interface ContactProps {
    config?: ContactConfig
}

export default function Contact({config}: ContactProps) {

    const [data, setData] = useState<ContactData| null>(null);
    const [languageCode, setLanguageCode] = useState<LanguageCode>(LanguageManager.code);
    const [isLoading, setLoadingState] = useState(false);
    const [resultText, setResultText] = useState<string | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const messageInputRef = useRef<HTMLTextAreaElement>(null);
    const [messageLength, setMessageLength] = useState(0);
    
    const handleLanguageChange = (code: LanguageCode) => {
        setLanguageCode(code);
    }

    const handleMessageInputChange = () => {
        setMessageLength(messageInputRef.current!.value.length);
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoadingState(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        console.log("Form submitted!");
        const email = formData.get('email');

        try {
            if (
                formData.get('name') === '' ||
                form.checkValidity() === false
            ) {
                setErrorText(data!.form_name_error_message)
            } else if (
                typeof email === 'string' &&
                email !== '' &&
                validateEmail(email) == null
            ) {
                setErrorText(data!.form_email_error_message)
            } else if (
                formData.get('message') === '' ||
                form.checkValidity() === false
            ) {
                setErrorText(data!.form_message_error_message)
            }
            else {
                setErrorText('');
                const result = await sendContactMessage<{
                    succeed: boolean
                }>(formData);
                if (result.succeed) {
                    setResultText(data!.form_response_success);
                    setTimeout(() => {
                        setResultText(null)
                    }, 3000);
                }
                else {
                    setErrorText(data!.form_response_error);
                }
            }
        }
        catch (e) {
            console.log(e);
            setErrorText(data!.form_response_error);
        }
        finally {
            setLoadingState(false);
        }
    }

    useEffect(() => {
        setErrorText("");
        loadData<ContactData>(DataType.CONTACT, languageCode).then((res) => {
            setData(res);
        });
        LanguageManager.subscribe(handleLanguageChange);

        return () => {LanguageManager.unsubscribe(handleLanguageChange)};
    }, [languageCode]);

    const terminate = () => {
        console.log("Contact: terminated");
    };

    const build = (): ReactNode => {
        if (!data) return (
            <Loading
                width="50px"
                height="50px"
                justify_content="center"
                text="Data is loading ..."
            />
        )
        try {
            return(
                <section id="contact">
                    <div className="container">
                        <h2>
                            {data.title}
                        </h2>
                        <p className="section_intro">
                            {data.description}
                        </p>
                        <div className="contact_content_wrapper">
                            <div className="contact_content_left_wrapper">
                                <h3>
                                    {data.contact_title}
                                </h3>
                                <p>
                                    {data.contact_description}
                                </p>
                                <a className="contact_link" href={data.github.url}>
                                    <div className="contact_link_icon">
                                        <svg fill="#000000" width="40px" height="40px" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact_link_title">
                                            {data.github.title}
                                        </span>
                                        <br />
                                        <span className="contact_link_tag">
                                            {data.github.tag}
                                        </span>
                                    </div>
                                </a>
                                <a className="contact_link" href={data.linkedin.url}>
                                    <div className="contact_link_icon">
                                        <svg fill="#000000" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"/>
                                            <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"/>
                                            <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact_link_title">
                                            {data.linkedin.title}
                                        </span>
                                        <br />
                                        <span className="contact_link_tag">
                                            {data.linkedin.tag}
                                        </span>
                                    </div>
                                </a>
                                <a className="contact_link" href={data.linkedin.url}>
                                    <div className="contact_link_icon">
                                        <svg fill="#000000"  version="1.1" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 512 512">
                                            <g id="7935ec95c421cee6d86eb22ecd135960">
                                                <path d="M309.215,304.749
                                                        c30.414,57.874,62.227,114.961,94.801,173.782c4.402,7.997,11.826,19.137,8.67,26.073c-4.242,9.332-25.275,5.539-41.855,5.539
                                                        c-19.523,0-36.902,3.53-49.764-0.799c-13.125-4.416-25.002-36.989-31.6-48.979c-27.934-50.773-57.736-105.254-85.319-154.831
                                                        c47.294-86.353,103.108-180.979,152.448-270.165c7.572-13.661,13.748-33.771,31.613-34.769C396.68,0.14,413.596,1.4,430.875,1.4
                                                        c14.32,0,36.428-2.108,40.295,3.941c6.6,10.367-10.842,30.466-15.807,39.51C407.158,132.44,356.971,217.997,309.215,304.749z
                                                        M125.953,357.67c15.657-1.908,23.653-23.777,30.789-36.341c22.631-39.746,45.697-80.715,66.369-117.705
                                                        c-12.774-23.728-29.766-51.385-44.249-76.624c-6.25-10.891-10.979-25.087-25.263-25.275c-25.275,0-50.575,0-75.85,0
                                                        c-4.129,0.586-7.846,1.635-8.682,5.527c-2.046,12.438,5.625,19.486,9.48,26.073c8.97,15.407,17.978,29.866,27.646,46.608
                                                        c3.094,5.327,12.874,18.938,12.625,24.489c-0.15,3.718-7.598,12.638-10.254,17.378c-21.607,38.586-39.334,70.735-60.83,109.009
                                                        c-3.194,5.689-10.267,12.301-7.896,20.534c1.023,3.605,6.749,6.637,9.469,6.325C74.853,357.67,100.403,357.67,125.953,357.67z"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact_link_title">
                                            {data.xing.title}
                                        </span>
                                        <br />
                                        <span className="contact_link_tag">
                                            {data.xing.tag}
                                        </span>
                                    </div>
                                </a>
                            </div>
                            <div className="contact_content_right_wrapper">
                                <form 
                                    action="POST"
                                    onSubmit={handleSubmit}
                                    className="contact_form">
                                    <div className="form_title_container">
                                        <span className="form_title">
                                            {data.form_title}
                                        </span>
                                    </div>
                                    <div className="form_result_text_container">
                                        <span className="form_result_text">
                                            {errorText}
                                        </span>
                                    </div>
                                    <div className="form_section form_section">
                                        <label className="form_label">
                                            {data.form_name}
                                        </label>
                                        <input className="form_input" type="text" name="name" id="name" maxLength={64} />
                                    </div>
                                    <div className="form_section">
                                        <label className="form_label" htmlFor="email">
                                            {data.form_email}
                                        </label>
                                        <input className="form_input" type="text" name="email" id="email" />
                                    </div>
                                    <div className="form_section">
                                        <label className="form_label" htmlFor="message">
                                            {data.form_message}
                                        </label>
                                        <textarea ref={messageInputRef} className="form_textarea" onChange={handleMessageInputChange} name="message" id="message" maxLength={1000}></textarea>
                                        <div className="form_text_length_container">
                                            <span className="form_text_length">
                                                {messageLength} / 1000
                                            </span>
                                        </div>
                                    </div>
                                    <div className="contact_form_button_container">
                                        <button className="form_button">
                                            {data.form_submit}
                                        </button>
                                    </div>
                                </form>
                                {
                                    (resultText)
                                    ? <div className="contact_form_output_wrapper">
                                        <div className="contact_form_output_content">
                                            <svg width="40px" height="40px" viewBox="0 0 117 117" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                                                    <g fillRule="nonzero" id="correct">
                                                        <path d="M34.5,55.1 C32.9,53.5 30.3,53.5 28.7,55.1 C27.1,56.7 27.1,59.3 28.7,60.9 L47.6,79.8 C48.4,80.6 49.4,81 50.5,81 C50.6,81 50.6,81 50.7,81 C51.8,80.9 52.9,80.4 53.7,79.5 L101,22.8 C102.4,21.1 102.2,18.5 100.5,17 C98.8,15.6 96.2,15.8 94.7,17.5 L50.2,70.8 L34.5,55.1 Z" fill="#17AB13" id="Shape"/>
                                                        <path d="M89.1,9.3 C66.1,-5.1 36.6,-1.7 17.4,17.5 C-5.2,40.1 -5.2,77 17.4,99.6 C28.7,110.9 43.6,116.6 58.4,116.6 C73.2,116.6 88.1,110.9 99.4,99.6 C118.7,80.3 122,50.7 107.5,27.7 C106.3,25.8 103.8,25.2 101.9,26.4 C100,27.6 99.4,30.1 100.6,32 C113.1,51.8 110.2,77.2 93.6,93.8 C74.2,113.2 42.5,113.2 23.1,93.8 C3.7,74.4 3.7,42.7 23.1,23.3 C39.7,6.8 65,3.9 84.8,16.2 C86.7,17.4 89.2,16.8 90.4,14.9 C91.6,13 91,10.5 89.1,9.3 Z" fill="#4A4A4A" id="Shape"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span className="contact_form_success_message">
                                                {resultText}
                                            </span>
                                        </div>
                                    </div>
                                    : null
                                }
                                {
                                    (isLoading && !resultText)
                                    ? <div className="contact_form_output_wrapper animation">
                                        <Loading
                                            width="100px" 
                                            height="100px"
                                            text="Daten werden gesendet ..." />
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        catch {
            return(
                null
            )
        }
    }

    return(
        !config ? build() : (
            <Frame
                title={config.title}
                icon_url={config.icon}
                onClose={terminate}
            >
                {build()}
            </Frame>
        )
    )
}
