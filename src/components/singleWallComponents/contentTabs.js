import React, { Suspense } from 'react'

// import './singlewall.scss'

const ContactForm = React.lazy(() => import('../form/ContactForm'))

const ContentTabs = ({wall, user, tabContent, setTabContent, description}) => (
    <>
        <div className='single__wall-tabs'>
            <span className={`single__wall-tab ${tabContent === 'description' && 'selected'}`} onClick={() => setTabContent('description')}><h4>Description</h4></span>
            <span className={`single__wall-tab ${tabContent === 'facilities' && 'selected'}`} onClick={() => setTabContent('facilities')}><h4>Facilities</h4></span>
            <span className={`single__wall-tab ${tabContent === 'contact-form' && 'selected'}`} onClick={() => setTabContent('contact-form')}><h4>Contact</h4></span>
        </div>
        <div className='single__wall-tab-content'>
            <div className={`single__wall-description ${tabContent === 'description' && 'visible'}`} dangerouslySetInnerHTML={description()}>
            </div>
            <div className={`single__wall-facilities-container ${tabContent === 'facilities' && 'visible'}`}>
                <div className={`single__wall-facilities ${tabContent === 'facilities' && 'visible'}`}>
                    <div>
                        <ul>
                            <li>
                                <span><img src='/images/bouldering-icon.png' alt='bouldering-icon'/><h4>Bouldering</h4> </span>
                                {wall.top && <span><img src='/images/rope-icon.svg' alt='top roping icon' /><h4>Top Roping</h4></span>}
                                {wall.lead && <span><img src='/images/quickdraw.png' alt='lead climbing icon' /><h4>Lead Climbing</h4></span>}
                                {wall.auto && <span><img src='/images/auto-belay.png' alt='auto belay icon'/><h4>Auto Belay</h4></span>}
                                {wall.gym && <span><img src='/images/training-rings.png' alt='gym icon'/><h4>Training Area</h4></span>}
                                <span><img src='/images/tea.png' alt='bouldering-icon'/><h4>Tea and Coffee</h4> </span>
                                {wall.cafe && <span><img src='/images/cafe.jpg' alt='cafe icon' /><h4>Onsite Cafe</h4></span>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`single__wall-contact-form ${tabContent === 'contact-form' && 'visible'}`}>
                <Suspense fallback={<div></div>}>
                    <ContactForm 
                        user={user}
                        wallId={wall.id}
                        visible={tabContent === 'contact-form'}
                    />
                </Suspense>
            </div>
        </div>
    </>
)

export default ContentTabs