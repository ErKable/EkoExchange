//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import {OwnerActionsLibrary as oal} from "../libraries/OwnerActionsLibrary.sol";

contract OwnerActionFacet {

    function addEkostable(address _newEkoStableAddress) external {
        oal._addEkoStable(_newEkoStableAddress);
    }

    function removeEkostable(address __ekoStableAddress) external {
        oal._removeEkoStable(__ekoStableAddress);
    }

   function addScoreToken(address _scoreTokenAddress) external{
        oal._addScoreToken(_scoreTokenAddress);
   }

   function removeScoreToken(address _scoreTokenAddress) external {
        oal._removeScoreToken(_scoreTokenAddress);
   }
}