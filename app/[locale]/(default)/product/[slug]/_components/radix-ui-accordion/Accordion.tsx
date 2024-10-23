"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";


interface AccordionProps {
	description: string;
	specifications: { [key: string]: any }[]; // Adjust type as needed
	measurement: string; // Adjust type as needed
	customFields: { [key: string]: any }[]; // Adjust type as needed
}

// Define Accordion Component
const AccordionComponent: React.FC<AccordionProps> = ({ description, specifications, measurement, customFields }) => (

	<Accordion.Root
		className="AccordionRoot !w-[100%] !mt-[20px] outline-none border-t-[1px] border-b-[1px] border-[#666] !rounded-none"
		type="single"
		defaultValue="item-1"
		collapsible
	>
		<Accordion.Item className="AccordionItem w-[100%] outline-none border-t-[1px] border-[#666] !rounded-none" value="item-1">
			<AccordionTrigger className="!text-[18px] !font-montserrat !font-[600] !text-clr !pl-[0px] !py-[.5em] tracking-[1px]">Description</AccordionTrigger>
			<AccordionContent>
				<table className="specs-table-prod other-detail w-[100%]">
					<tbody>
						<tr id="tr-data warranty" className="table-warranty">
							<td className="productView-info-value p-0 px-2" dangerouslySetInnerHTML={{ __html: (description) }}></td>
						</tr>
					</tbody>
				</table>
			</AccordionContent>
		</Accordion.Item>

		{specifications && specifications.length > 0 ?
			<Accordion.Item className="AccordionItem w-[100%] outline-none border-t-[1px] border-[#666] !rounded-none" value="item-2">
				<AccordionTrigger className="!text-[18px] !font-montserrat !font-[600] !text-clr !pl-[0px] !py-[.5em] tracking-[1px]">Product Specifications</AccordionTrigger>
				<AccordionContent>
					<table className="specs-table-prod other-detail w-[100%]">
						<tbody>

							{specifications && specifications.map(specification => {
								return (
									<tr id="tr-data" className="Product_spec--table" key={specification.node.name}>
										<td className="productView-info-name p-0 py-2 ">{specification.node.name}:</td>
										<td className="productView-info-value p-0">{specification.node.value}</td>
									</tr>
								)
							})}


							{/* <tr id="tr-data" className="Product_spec--table">
							<td className="productView-info-name p-0 py-2  ">Mattress Type:</td>
							<td className="productView-info-value p-0  ">Memory Foam</td>
						</tr>
						<tr id="tr-data" className="Product_spec--table">
							<td className="productView-info-name p-0 py-2  ">Comfort Level:</td>
							<td className="productView-info-value p-0  ">Medium</td>
						</tr>
						<tr id="tr-data" className="Product_spec--table">
							<td className="productView-info-name p-0 py-2  ">Assembly Required:</td>
							<td className="productView-info-value p-0  ">No</td>
						</tr>
						<tr id="tr-data" className="Product_spec--table">
							<td className="productView-info-name p-0 py-2  ">Flammability Standard:</td>
							<td className="productView-info-value p-0  ">Meets 16 CFR 1634</td>
						</tr>
						<tr id="tr-data" className="Product_spec--table">
							<td className="productView-info-name p-0 py-2  ">Manufactured:</td>
							<td className="productView-info-value p-0  ">Made in USA</td>
						</tr> */}
						</tbody>
					</table>
				</AccordionContent>
			</Accordion.Item> :
			null}

		<Accordion.Item className="AccordionItem w-[100%] outline-none border-t-[1px] border-[#666] !rounded-none" value="item-3">
			<AccordionTrigger className="!text-[18px] !font-montserrat !font-[600] !text-clr !pl-[0px] !py-[.5em] tracking-[1px]">Measurements</AccordionTrigger>
			<AccordionContent>
				<table className="specs-table-prod other-detail w-[100%]">
					<tbody>
						<tr id="tr-data measurements" className="measurementData">
							<td className="productView-info-name p-0 py-2">Full</td>
							<td className="productView-info-value p-0 size">54" x 75"</td>
						</tr>
						<tr id="tr-data measurements" className="measurementData">
							<td className="productView-info-name p-0 py-2">King</td>
							<td className="productView-info-value p-0 size">76" x 80"</td>
						</tr>
						<tr id="tr-data measurements" className="measurementData">
							<td className="productView-info-name p-0 py-2">Queen</td>
							<td className="productView-info-value p-0 size">60" x 80"</td>
						</tr>
						<tr id="tr-data measurements" className="measurementData">
							<td className="productView-info-name p-0 py-2">Twin</td>
							<td className="productView-info-value p-0 size">39" x 75"</td>
						</tr>
					</tbody>
				</table>
			</AccordionContent>
		</Accordion.Item>

		<Accordion.Item className="AccordionItem w-[100%] outline-none border-t-[1px] border-[#666] !rounded-none" value="item-4">
			<AccordionTrigger className="!text-[18px] !font-montserrat !font-[600] !text-clr !pl-[0px] !py-[.5em] tracking-[1px]">Warranty Info</AccordionTrigger>
			<AccordionContent>
				<table className="specs-table-prod other-detail w-[100%]">
					<tbody>
						<tr id="tr-data warranty" className="table-warranty">
							<td className="productView-info-value p-0 px-2">Forever Warranty? ✓ Check. Sleep soundly knowing this mattress has your back in more ways than one!</td>
						</tr>
					</tbody>
				</table>
			</AccordionContent>
		</Accordion.Item>

	</Accordion.Root>

);

// Define AccordionTrigger Component
const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Accordion.Trigger>>(
	({ children, className, ...props }, forwardedRef) => (
		<Accordion.Header className="AccordionHeader">
			<Accordion.Trigger
				className={classNames("AccordionTrigger", className)}
				{...props}
				ref={forwardedRef}
			>
				{children}
				{/* <ChevronDownIcon className="AccordionChevron" aria-hidden /> */}
				<img className="AccordionChevron" src="https://store-z2qdisybty.mybigcommerce.com/content/svgs/circle-plus-solid.svg" />
			</Accordion.Trigger>
		</Accordion.Header>
	)
);

// Define AccordionContent Component
const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Accordion.Content>>(
	({ children, className, ...props }, forwardedRef) => (
		<Accordion.Content
			className={classNames("AccordionContent", className)}
			{...props}
			ref={forwardedRef}
		>
			<div className="AccordionContentText">{children}</div>
		</Accordion.Content>
	)
);

// Export the main Accordion component
export default AccordionComponent;
