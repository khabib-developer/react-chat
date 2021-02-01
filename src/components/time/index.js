import React, {Component, useEffect, useState} from 'react';

const Time = ({date}) => {
	const interval = Math.floor(Date.now()/1000) - date
	const [time, setTime] = useState(interval)
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(time => Math.floor(Date.now()/1000) - date)
		}, 1000)
		return () => clearInterval(interval);
	})
	if(time<=60) {
		return (
			<div>
				{time} c
			</div>
		)
	}
	if(time<=3600&&time>60) {
		return (
			<div>
				{Math.floor(time/60)} мин
			</div>
		)
	}
	if(time<86400&&time>3600) {
		return (
			<div>
				{Math.floor(time/60/60)} ч
			</div>
		)
	}
	if(time>=86400) {
		return (
			<div>
				{Math.floor(time/60/60/24)} д
			</div>
		)
		
	}
	
}
export default Time