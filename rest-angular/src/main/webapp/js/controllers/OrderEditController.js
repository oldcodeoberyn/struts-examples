/*
 * $Id$
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('OrderEditController', OrderEditController);

    function OrderEditController($log, $routeParams, $location, DataService) {
        var vm = this;
        vm.id = $routeParams.id;
        vm.mode = "Edit";
        vm.errors = {};

        init(vm.id);

        function init(id) {
            return DataService.getOrder(id).then(function(order) {
                vm.order = order;
                return vm.order;
            }, function() {
                $log.error('Could not receive order for id: '+ id);
            });
        }

        vm.submitOrder = function(order){
            vm.errors = {};
            DataService.editOrder(order).then(function(order) {
                vm.order = order;
                $location.path("/orders");
            }, function(errors) {
                $log.error('Could not save order with id: '+ order.id);
                vm.errors = errors;
            });
        };
    }
})();