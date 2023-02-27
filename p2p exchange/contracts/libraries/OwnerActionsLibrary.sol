//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {OwnershipLib as ol} from "./OwnershipLib.sol";
import {DiamondStorage as dsto} from "./DiamondStorage.sol";
import {ErrorsAndEvents as ee} from "./ExchangeEventAndErrors.sol";

library OwnerActionsLibrary {

    function _addEkoStable(address _ekoStableAddress) internal {
        ol.checkOwnership();
        dsto.ExchangeInfoStorage storage es = dsto.getExchangeStorage();        
        EnumerableSet.add(es.acceptedEkoStables, _ekoStableAddress);
        emit ee.NewEkoStableAccepted(_ekoStableAddress);
    }

    function _removeEkoStable(address _ekoStableAddress) internal {
        ol.checkOwnership();
        dsto.ExchangeInfoStorage storage es = dsto.getExchangeStorage();
        if(EnumerableSet.contains(es.acceptedEkoStables, _ekoStableAddress)){
            EnumerableSet.remove(es.acceptedEkoStables, _ekoStableAddress);
            emit ee.EkoStableNoMoreAccepted(_ekoStableAddress);
        } else{
            revert ee.AlreadyUnacceptedEkoStable(_ekoStableAddress);
        }
    }

    /* function _setScoreTokenAddress(address _newScoreTokenAddress) internal {
        ol.checkOwnership();
        if(_newScoreTokenAddress == address(0)){
            revert ee.ScoreTokenCannotHaveZeroAddress();
        }        
        dsto.ExchangeInfoStorage storage es = dsto.getExchangeStorage();
        address scoreTokenAddress = es.scoreTokenAddress;
        if(_newScoreTokenAddress == scoreTokenAddress){
            revert ee.NewScoreTokenAddressEqualToThePrevious();
        }
        es.scoreTokenAddress = _newScoreTokenAddress;
        emit ee.ScoreTokenAddressUpdated(scoreTokenAddress, _newScoreTokenAddress);
    } */

    function _addScoreToken(address _scoreTokenAddress) internal {
        ol.checkOwnership();
        if(_scoreTokenAddress == address(0)){
            revert ee.ScoreTokenCannotHaveZeroAddress();
        }
        dsto.ExchangeInfoStorage storage es = dsto.getExchangeStorage();
        if(EnumerableSet.contains(es.acceptedScoreTokens, _scoreTokenAddress)){
            revert ee.ScoreTokenAlreadyAccepted(_scoreTokenAddress);
        }
        EnumerableSet.add(es.acceptedScoreTokens, _scoreTokenAddress);
        emit ee.NewScoreTokenAccepted(_scoreTokenAddress);
    }

    function _removeScoreToken(address _scoreTokenAddress) internal {
        ol.checkOwnership();
        if(_scoreTokenAddress == address(0)){
            revert ee.ScoreTokenCannotHaveZeroAddress();
        }
        dsto.ExchangeInfoStorage storage es = dsto.getExchangeStorage();
         if(!EnumerableSet.contains(es.acceptedScoreTokens, _scoreTokenAddress)){
            revert ee.UnexistingScoreToken(_scoreTokenAddress);
        }
        EnumerableSet.remove(es.acceptedScoreTokens, _scoreTokenAddress);
        emit ee.ScoreTokenNoLongerAccepted(_scoreTokenAddress);
    }

}