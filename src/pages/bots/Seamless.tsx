import React, { useState } from 'react';
import { instance } from '../../axios';
import { AppComponentProps } from '../../components/Route';
import { IonButton, IonGrid, IonRow, IonCol, IonCard,  IonText,} from '@ionic/react';
import './ManageServer.scss';
import { useHistory, useParams } from 'react-router';
import Loader from '../../components/Loader';
import './SeamlessDetail.scss';
import discordImage from '../../images/discord.png';
import twitterImage from '../../images/twitter.png';
import { useQuery } from 'react-query';

/**
 * The page they see when they click "Initiate Seamless"
 *
 * This lists all of the discords we have. User has to click into one to proceed
 */

const SeamlessDetail: React.FC<AppComponentProps> = () => {
    let history = useHistory();
    const { serverId } = useParams<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverList, setServerList] = useState<any>([]);

    // this loads up all the discords etc
    const { data: servers = [] } = useQuery<any>(  ['allServers'],
        async () => {
            setIsLoading(true)
            const { data: { guilds },  } = await instance.get('/getAllGuildsData');
            let tmpServerArr = []
            setIsLoading(false)
            for(let i=0; i<guilds.length;i++){
                if(guilds[i].id !== serverId ){
                    tmpServerArr.push(guilds[i])
                }
            }
            setServerList(tmpServerArr)
            return guilds;
        }
    );

    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <h2 className="ion-no-margin font-bold text-xl"> Seamless - select a DAO</h2>
                        <p className='ion-no-margin text-sm'>A new way to Request a collaboration with one of our  partnered servers, select the server you wish to collaborate with in list below, and fill out the collaboration form on the next page.</p>
                    </IonCol>

                    <IonCol ize-xl="12" size-md="12" size-sm="12" size-xs="12"></IonCol>

                    {/*<IonCol ize-xl="12" size-md="12" size-sm="12" size-xs="12">*/}
                    {/*    <div className='font-bold text-xl'>Select a DAO to give whitelists to</div>*/}
                    {/*</IonCol>*/}

                        <>
                            {isLoading ? <Loader/> :
                            <>
                                {serverList && serverList.map((server: any,index:number)=>{
                                    return(
                                        <IonCol size-xl="4" size-md="6" size-sm="6" size-xs="12" key={index} >
                                            <IonCard className='ion-no-margin'>

                                                <div className="cardImage relative">

                                                    {/* image */}
                                                    <img src={server?.icon} className={server?.icon ? 'cardMainImage' : 'cardNoImage'}  alt='' />

                                                    <div className="cardOverlay-content py-1 px-4">

                                                        <div className=' text-md'>{server?.name}</div>

                                                        <div className="socialMediaIcon">

                                                            {/*discord*/}
                                                            <img hidden={!discordImage} src={discordImage} style={{ height: '18px' }} className='cursor-pointer' onClick={(event)=>{
                                                                event.stopPropagation();
                                                                if(server.discord_link){
                                                                    window.open(server?.discord_link)
                                                                }}} />

                                                            {/*twitter*/}
                                                            <img hidden={!twitterImage} src={twitterImage} style={{ height: '18px' }} className='cursor-pointer' onClick={(event)=>{
                                                                event.stopPropagation();
                                                                if(server.twitter_link){
                                                                    window.open(server?.twitter_link)
                                                                }}} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <IonGrid className="py-4 px-4">
                                                    <IonRow hidden={!server?.twitter_followers}>
                                                        <IonCol size="8">
                                                            <IonText className='text-white'>Twitter Followers</IonText>
                                                        </IonCol>
                                                        <IonCol size="4" className="ion-text-end">
                                                            <IonText className="greenText">{server?.twitter_followers || 0 } </IonText>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow hidden={!server?.twitter_interactions}>
                                                        <IonCol size="8">
                                                            <IonText className='text-white'>Twitter Interaction</IonText>
                                                        </IonCol>
                                                        <IonCol size="4" className="ion-text-end">
                                                            <IonText className="BlueText">{server?.twitter_interactions || 0}</IonText>
                                                        </IonCol>
                                                    </IonRow>
                                                    <div className="content-extra-space"></div>

                                                    <IonRow hidden={!server?.discord_members}>
                                                        <IonCol size="8">
                                                            <IonText className='text-white'>Discord Members</IonText>
                                                        </IonCol>
                                                        <IonCol size="4" className="ion-text-end">
                                                            <IonText className="greenText">{server?.discord_members || 0}</IonText>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow hidden={!server?.discord_online}>
                                                        <IonCol size="8">
                                                            <IonText className='text-white'>Online</IonText>
                                                        </IonCol>
                                                        <IonCol size="4" className="ion-text-end">
                                                            <IonText className="BlueText">{server?.discord_online || 0}</IonText>
                                                        </IonCol>
                                                    </IonRow>
                                                    <IonRow>
                                                        <IonCol size="12">
                                                            <IonButton className="cardButton w-full" onClick={(event) => {
                                                                event.stopPropagation()
                                                                history.push({pathname:`/seamlessdetail/${serverId}`,state:server})} }>
                                                                Initiate Seamless
                                                            </IonButton>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonGrid>
                                            </IonCard>
                                        </IonCol>
                                    )
                                })}
                            </>}
                        </>
                </IonRow>
            </IonGrid>
        </>
    );
};
// @ts-ignore
export default SeamlessDetail;
