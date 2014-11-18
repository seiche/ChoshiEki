<?php

/*
 * Copyright (C) 2013 WSD
 *      http://www.wsd.co.jp
 *	By Benjamin Collins
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

	require 'tmhOAuth.php';

	$tmhOAuth = new tmhOAuth(array(
	'consumer_key' => 'eXfF8CZJae69WTxDe5Ehw',
	'consumer_secret' => '6Gs9A62h2D3QWZrmLztwgRrZJHUh4xvqX7r4yVOVhKE',
	'user_token' => '418469600-rl4ETI0BtOqAS0SsoBHkYXLA3XO4XebzpTfDGKj4',
	'user_secret' => 'YXf9MvpIuEiQ9BF9jv9mdoDB3kh9XF5A4QN4F5Iqn6P63',
	'curl_ssl_verifypeer' => false
	));

	$code = $tmhOAuth->request('GET', $tmhOAuth->url('1.1/statuses/user_timeline'), array(
	'screen_name' => 'ekiden_live',
	'count' => '20'));

	$response = $tmhOAuth->response['response'];
	echo $response;
?>