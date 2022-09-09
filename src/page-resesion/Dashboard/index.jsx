import React, { Component } from "react";
import moment from "moment";
import "moment/locale/sl";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";
import { rooms, bookings } from "./dummy_data";
import "react-calendar-timeline/lib/Timeline.css";
import "./BookingsTimeline.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AutoProvider  from "../../privateRoute/AutoProvider";

import ModalOptionBooking from './ModalOptionBooking.jsx';

const Dashboard = (props) => {

	const [state,setSate] =useState()

	const { handler, fillconten } = ModalOptionBooking();
	const [save,setSave] =useState()

	const {jwt} =useContext(AutoProvider)

	useEffect(() =>{
		fetch(`http://localhost:4000/api/resecion/getroomsresecion/${jwt.result.id_hotel}`)
		.then(resp => resp.json())
		.then(data => setSate(data.query))
	},[]);

	const { onCanvasClickParentUpdate } = props;
    const currentDate = moment();

	const isWeekendDay = (intervalContext, data) => {
		if (data.isMonth) {
			return false;
		}
		const day = intervalContext.interval.startTime.day();
		return day === 6 || day === 0; // Saturday or Sunday
	}

	const isCurrentDay = (intervalContext, data) => {
		return (
			!data.isMonth &&
			intervalContext.interval.startTime.isSame(data.currentDate, "day")
		);
	}

	const onItemClick = (itemId, e, time, onItemSelectParentUpdate, hand) => {
		console.log("claic")
		const to = bookings.filter(index => index.id === itemId);

		//console.log(to);
		setSave(to)
		//console.log(stater);

		handler();
		//onItemSelectParentUpdate(itemId);
	}

	const itemRenderer = ({ item, itemContext, getItemProps }) => {
		return (
			<div
				{...getItemProps({
				style: {
					display: "flex",
					alignItems: "center",
					background: item.state === 2 ? "purple" : "green",
					border: `3px solid ${
					itemContext.selected ? "#fff700" : "transparent"
					}`,
					borderRadius: "12.5px",
					boxShadow: "rgba(0, 0, 0, 0.16) 0 0.3rem 0.6rem"
				}
				})}
			>
				<div
				style={{
					position: "sticky",
					left: "0",
					display: "inline-block",
					overflow: "hidden",
					padding: "0 1rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				}}
				>
				{itemContext.title}
				</div>
			</div>
		);
	}

	const intervalRenderer = ({ intervalContext, getIntervalProps, data }) => {
		return (
		<div
			{...getIntervalProps()}
			className={`rct-dateHeader ${
			data.isMonth ? "rct-dateHeader-primary" : ""
			}`}
			onClick={() => {
				return false;
			}}
		>
			<span
			style={{
				position: data.isMonth ? "sticky" : "static",
				marginRight: data.isMonth ? "auto" : "inherit",
				left: "0",
				padding: "0 1rem",
				fontWeight:
				isWeekendDay(intervalContext, data) ||
				isCurrentDay(intervalContext, data)
					? "400"
					: "300",
				color: isCurrentDay(intervalContext, data) ? "black" : "black"
			}}
			>
			{intervalContext.intervalText}
			</span>
		</div>
		);
	}

	if(!state)  return null

	return (

		<>
		<Timeline
			groups={state}
			items={bookings}
			defaultTimeStart={moment().startOf("day").add(-3, "day")}
			defaultTimeEnd={moment().startOf("day").add(5, "day")}
			sidebarWidth={200}
			lineHeight={52}
			itemHeightRatio={0.5}
			canMove={false}                                                                             
			maxZoom={365.24 * 86400 * 1000}
			minZoom={60 * 60 * 1000}
			itemRenderer={itemRenderer}
			onItemClick={(itemId, e, time) => onItemClick(itemId, e, time)}
			showCursorLine
		>
		  	<TimelineHeaders className="list-booking-sticky">
				<SidebarHeader />
				<DateHeader
					unit="month"
					labelFormat="MMMM"
					headerData={{ isMonth: true }}
					intervalRenderer={intervalRenderer}
				/>
				<DateHeader
					unit="day"
					labelFormat="D"
					headerData={{ isMonth: false, currentDate }}
					intervalRenderer={intervalRenderer}
				/>
		  	</TimelineHeaders>
		</Timeline>

		{fillconten({save})}
		</>
	);

}

export default Dashboard;