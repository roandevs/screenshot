import React from 'react';
import Head from 'next/head';
import ScreenshotDisplay from '@/components/ScreenshotDisplay';
import ScreenshotInput from '@/components/ScreenshotInput';
import {getApis} from '@/utils/screenshotProviders';

export async function getServerSideProps({ req, res }){
    const apis = getApis();
    return {
        props: {
            apis: apis, 
        }
    }
}

export default class ScreenshotApp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            webLink: '',
            imageData: '',
            loading: false,
        }
    }

    setImageData(imageData, webLink){
        this.setState({
            imageData: imageData,
            webLink: webLink
        });
    }

    setLoading(){
        this.setState({
            loading: !this.state.loading
        })
    }

    handleErrorLoading(){
        this.setState({
            imageData: '',
            webLink: '',
            loading: false,
        });
    }

    render(){
        return (
            <>
                <Head>
                    <meta name="description" content="An open-source, easy to use, website screenshot tool" />
                    <meta name="keywords" content={`screenshot a website, ss a website, website checker, capture website`} />
                    <title>Capture a Website screenshot</title>
                    <meta property="og:title" content='Capture a Website screenshot'/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="/"/>                    
                </Head>
                <ScreenshotDisplay webLink={this.state.webLink} imageData={this.state.imageData} loading={this.state.loading} handleErrorLoading={this.handleErrorLoading.bind(this)}/>
                <ScreenshotInput apis={this.props.apis} setImageData={this.setImageData.bind(this)} webLink={this.state.webLink} setLoading={this.setLoading.bind(this)}/>
            </>
        )
    }
}