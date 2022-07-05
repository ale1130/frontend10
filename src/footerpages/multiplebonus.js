import React from "react";

import { useTranslation } from 'react-i18next';

function MultiBonus (){

    const { t } = useTranslation();

    return (
        <>
            <div className="container-fluid body-content slider-height">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <h1>{t('bonus')+" "+t('multipla')}</h1>
                            <p>{t('descrizionemultipla')}</p>
                        </div>

                        <div className="col-sm-3 col-6">
                            
                            <div className="title-table">
                                <h3>
                                    {t('neventi')}
                                </h3>
                                <h3>
                                    % {t('bonus')}
                                </h3>
                            </div>
        
                            <div className="body-d-table">
                                <p>5</p>
                                <p>4% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>6</p>
                                <p>7% {t('bonus')}</p>
                            </div>
                            <div className="body-d-table">
                                <p>7</p>
                                <p>10% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>8</p>
                                <p>14% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>9</p>
                                <p>17% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>10</p>
                                <p>20% {t('bonus')}</p>
                            </div>
                        </div>

                        <div className="col-sm-3 col-6">

                            <div className="title-table">
                                <h3>
                                    {t('neventi')}
                                </h3>
                                <h3>
                                   % {t('bonus')}
                                </h3>
                            </div>

                            <div className="body-d-table">
                                <p>11</p>
                                <p>22% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>12</p>
                                <p>25% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>13</p>
                                <p>30% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>14</p>
                                <p>35% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>15</p>
                                <p>40% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>16</p>
                                <p>45% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>17</p>
                                <p>50% {t('bonus')}</p>
                            </div>
                        </div>

                        <div className="col-sm-3 col-6">

                            <div className="title-table">
                                <h3>
                                    {t('neventi')}
                                </h3>
                                <h3>
                                    % {t('bonus')}
                                </h3>
                            </div>

                            <div className="body-d-table">
                                <p>18</p>
                                <p>55% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>19</p>
                                <p>60% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>20</p>
                                <p>65% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>21</p>
                                <p>70% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>22</p>
                                <p>75% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>23</p>
                                <p>80% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>24</p>
                                <p>90% {t('bonus')}</p>
                            </div>
                        </div>

                        <div className="col-sm-3 col-6">

                            <div className="title-table">
                                <h3>
                                    {t('neventi')}
                                </h3>
                                <h3>
                                    % {t('bonus')}
                                </h3>
                            </div>

                            <div className="body-d-table">
                                <p>25</p>
                                <p>100% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>26</p>
                                <p>110% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>27</p>
                                <p>120% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>28</p>
                                <p>130% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>29</p>
                                <p>140% {t('bonus')}</p>
                            </div>

                            <div className="body-d-table">
                                <p>30</p>
                                <p>150% {t('bonus')}</p>
                            </div>
                        </div>
                    </div>
                
                </div>

            </div>
        </>
    )
}

export default MultiBonus;


        