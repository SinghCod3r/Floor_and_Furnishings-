import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetDataWithToken } from "../../ApiHelper/ApiHelper";
import Loader from "../../Common/Loader";
import { Helper } from "../../Utility/helper";
import {
  MaterialStyleTypes,
  MaterialCategoryName,
  SofaSelectionType,
} from '../../../Constant/CurtainData';

function ViewEstimate() {
  const location = useLocation();
  const type = location.state.EnquiryDetials?.id;
  // console.log("typeee", location.state.EnquiryDetials?.service_amount);
  const [getAllEstimateData, setAllEstimateData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [EnquiryDetials, getEnquiryDetials] = useState([]);
  const [rooms, setRooms] = React.useState([]);
  // const [discount, setDiscount] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [LadderPrice, setLadderPrice] = useState("");

  useEffect(() => {
    setLoading(true);
    GetDataWithToken(`sales/get-estimate/${type}`).then((response) => {
      if (response.status === true) {
        // console.log("rtessssss", response.);
        setAllEstimateData(response.data);
        setLoading(false);
        setLadderPrice(response?.ladderCharges);
        getEnquiryDetials(location.state.EnquiryDetials);
        // console.log("resssss", response.data);
        setRooms(response.data);
      }
    });
  }, [""]);

  const customer = EnquiryDetials?.customer ?? "";
  const id = EnquiryDetials?.id;
  const cartageAmount = EnquiryDetials?.cartage ? EnquiryDetials?.cartage : 0;
  const cartageAmountWithGst = EnquiryDetials?.cartage_amount_with_tex
    ? EnquiryDetials?.cartage_amount_with_tex
    : 0;

  const contactNumber = customer?.primary_phone ?? "";
  const measurerSchedule =
    EnquiryDetials?.enquiryschedules?.length > 0
      ? EnquiryDetials?.enquiryschedules[0]
      : '';
  const re_measurement_date = measurerSchedule?.re_measurement_date;
  const email = customer?.primary_email ?? "";
  const Gst = customer?.GST ?? "";
  const icUser = EnquiryDetials?.user ?? "";
  const serviceAmount = location.state.EnquiryDetials?.service_amount
    ? location.state.EnquiryDetials?.service_amount
    : 0;
  const expected_installation_date = EnquiryDetials?.expected_installation_date;
  const expected_delivery_date = EnquiryDetials?.expected_delivery_date;

  const getDeliveryAddress = () => {
    let address = EnquiryDetials?.address
      ? EnquiryDetials?.address
      : EnquiryDetials?.street ?? '';

    if (EnquiryDetials?.landmark) {
      address = `${EnquiryDetials?.landmark}${EnquiryDetials?.city}${EnquiryDetials?.state} ${EnquiryDetials?.pincode}`
    }
    return address;
  };

  const getBillingAddress = () => {
    const addresses = Array.isArray(EnquiryDetials?.customer?.addresses)
      ? [...EnquiryDetials?.customer?.addresses]
      : [];

    const addressObj = addresses.find(item => item?.type === 'billing');
    let address =
      `${addressObj?.address ? addressObj?.address : addressObj?.street} ${addressObj?.landmark} ${addressObj?.city} ${addressObj?.state} ${addressObj?.pincode}`
    return address;
  };

  // console.log("Enqqq expected_delivery_date", EnquiryDetials);
  const getEmptyValue = value => {
    if (['null', null, undefined, 'undefined', 'NaN', NaN].includes(value)) {
      return '';
    }
    return value;
  };

  const getIntegerOnly = value => {
    if (value) {
      return parseFloat(value).toFixed(0);
    }
    return value;
  };

  const renderTotalRoomAmount = (amount, colspan = 14) => {
    if (!amount) {
      return ``;
    }
    return (
      <tr>
        <th colSpan={14 / 2 + 1}>Total amount</th>
        <th colSpan={Math.round(14 / 2)}>{amount}</th>
      </tr>
    );
  };

  const getMaterialFormate = ({
    title,
    value,
    type,
    noOfPanel,
    stitchingPrice,
    stitchingCost,
    totalFabricInM,
    totalPrice,
    discount,
    tax,
    grandTotal,
    totalTax,
    unit,
    mrp,
    totalDiscount,
    curtainStyle,
    fabric1_ring_color,
    widthInFeet,
    qty,
    fittingCharge,
    hardwareSqmt,
  }) => {
    return {
      title,
      value,
      type,
      noOfPanel,
      stitchingPrice,
      stitchingCost,
      totalFabricInM,
      totalPrice,
      discount,
      tax,
      grandTotal,
      totalTax,
      unit,
      mrp,
      totalDiscount,
      curtainStyle, fabric1_ring_color,
      widthInFeet,
      qty,
      fittingCharge,
      hardwareSqmt,
    };
  };
  const getPriceFormate = (price) => {
    if (price) {
      return parseFloat(price).toFixed(2);
    }
    return price;
  };
  const getTotalFabric = (total) => {
    if (total) {
      return parseFloat(total).toFixed(2);
    }
    return total;
  };

  const renderStitchingCost = (window, colspan = 16) => {
    const stitching = window?.stitchingList ?? [];

    const totalAmount = stitching?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (stitching?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colSpan="16">Fabric stitching details</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan="4">Item</th>
          <th colSpan="3">Curtain style</th>
          <th>No of panel / Width in ft</th>
          <th>Stitching price including taxes</th>
          <th>Weight price including taxes / Fitting charge</th>
          <th>Hand hamming price including taxes</th>
          <th>Lead chain price including taxes</th>
          <th>Gross amount </th>
          {/* <th>Dis</th> */}
          <th>Net amount including taxes (18%)</th>
        </tr>
        {stitching?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td colSpan="4">{item?.title}</td>
              <td colSpan="3">{item?.curtainStyle} {item?.fabric1_ring_color && `(${item?.fabric1_ring_color})`}</td>
              <td>{item?.noOfPanel}</td>
              <td>{item?.stitchingPrice}</td>
              <td>{item?.weightPrice}</td>
              <td>{item?.handHammingPrice}</td>
              <td>{item?.leadChainPrice}</td>
              <td>{item?.totalPrice}</td>
              {/* <td>{item?.totalDiscount}</td> */}
              <td>{item?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };
  const renderRoomHardware = (
    window = {},
    windowIndex,
    tax = 0,
    colspan = 16
  ) => {
    // console.log("window hardware listttt", window, tax);
    const hardwareList = window?.hardwareList ?? [];

    const totalAmount = hardwareList?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (hardwareList.length == 0) {
      return ``;
    }
    return (
      <>
        <tr>
          <th colSpan="16">Curtain Hardware details</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan={3}>Item</th>
          <th colSpan={4}>Item name</th>
          <th>Width</th>
          <th>Qty</th>
          <th>MRP including taxes</th>
          <th>Fitting charge</th>
          <th>Gross amount</th>
          <th>Dis</th>
          <th>Net amount including taxes</th>
        </tr>
        {/* {console.log("hardwareeeeeee..... listtttt...", hardwareList)} */}
        {hardwareList?.map((item, index) => {
          return (
            <>
              <tr>
                <td>{index + 1}</td>
                <td colSpan={3}>{item?.title}</td>
                <td colSpan={4}>{item?.value}</td>
                <td>
                  {item?.widthInFeet && +item?.widthInFeet > 0
                    ? item?.widthInFeet + " ft"
                    : ""}
                </td>
                <td>{item?.qty ? item?.qty : ""}</td>
                <td>{item?.mrp ? item?.mrp : item?.hardwareSqmt}</td>
                <td>{item?.fittingCharge && item?.fittingCharge}</td>
                <td>{item?.totalPrice && item?.totalPrice}</td>
                <td>{item?.discount ? `${item?.discount}%` : '0'}</td>
                <td>{item?.grandTotal ? item?.grandTotal : ''}</td>
              </tr>
            </>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderRoomBlind = (window = {}, windowIndex, room, colspan = 16) => {
    const blind = window?.blind ?? "";
    const blindList = blind?.blindList ?? [];
    // console.log("windowwww---", room);
    const totalAmount = blindList?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    //Helper.log("blindList", blindList)
    if (blindList.length == 0) {
      return ``;
    }

    return (
      <>
        <tr>
          <th colSpan={colspan}>Blind details</th>
        </tr>
        <tr>
          <th colSpan={colspan / 2}>Width - {blind?.width} cm</th>
          <th colspan={Math.round(colspan / 2)}>
            height / Drop - {blind?.height} cm
          </th>
        </tr>
        {/* {console.log("blind ply...", blind)} */}
        <tr>
          <th colSpan={colspan / 1}>Ply wood required - {room?.blind?.blind_plywood_required}</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan="1">Item</th>
          <th colSpan="4">Item name</th>
          <th>Qty</th>
          <th>No of panel</th>
          <th>Total Quantity</th>
          <th>Fabric MRP per SQMT</th>
          <th>Fitting charge</th>
          <th>Hardware Per RFT including taxes</th>
          <th>Gross amount</th>
          <th>Dis</th>
          <th>Net amount including taxes</th>
        </tr>
        {blindList?.map((fabric, fabricIndex) => {
          return (
            <tr>
              <td>{fabricIndex + 1}</td>
              <td colSpan={1}>{fabric?.title && fabric?.title}</td>
              <td colSpan={4}>{fabric?.value && fabric?.value}</td>
              <td>{fabric?.qty && fabric?.qty}</td>
              <td>{fabric?.noOfPanel && fabric?.noOfPanel}</td>
              <td>{fabric?.totalFabricInM && fabric?.totalFabricInM}</td>
              <td>{fabric?.mrp && fabric?.mrp}</td>
              <td>{fabric?.fittingCharge && fabric?.fittingCharge}</td>
              <td>{fabric?.hardwareSqmt && fabric?.hardwareSqmt}</td>
              <td>{fabric?.totalPrice && fabric?.totalPrice}</td>
              {/* <td>{fabric?.dis}</td> */}
              <td>{fabric?.discount && `${fabric?.discount}%`}</td>
              <td>{fabric?.grandTotal && fabric?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderBlindStitchingCost = (window, colspan = 16) => {
    const blind = window?.blind ?? "";
    const stitching = blind?.blindStitchingList ?? [];

    const totalAmount = stitching?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (stitching?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colSpan={16}>Blind stitching details</th>
        </tr>
        <tr>
          <th colSpan={8}>Width - {blind?.width && blind?.width} cm</th>
          <th colSpan={8}>height / Drop - {blind?.height && blind?.height} cm</th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan={4}>Item</th>
          <th colSpan={3}>No of panel</th>
          <th colSpan={2}>Stitching price Per SQMT including taxes</th>
          <th colSpan={3}>Gross amount</th>
          {/* <th>Dis</th> */}
          <th colSpan={2}>Net amount including taxes</th>
        </tr>
        {stitching?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td colSpan={4}>{item?.title}</td>
              <td colSpan={3}>{item?.noOfPanel}</td>
              <td colSpan={2}>{item?.stitchingPrice}</td>
              <td colSpan={3}>{item?.totalPrice}</td>
              {/* <td>{item?.totalDiscount}</td> */}
              <td colSpan={2}>{item?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };

  const renderBlindHardware = (
    window = {},
    windowIndex,
    tax = 0,
    colspan = 16
  ) => {
    const blind = window?.blind ?? "";
    const blindList = blind?.blindHardwareList ?? [];

    const totalAmount = blindList?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (blindList.length == 0) {
      return ``;
    }

    return (
      <>
        <tr>
          <th colSpan={16}>Blind Hardware details</th>
        </tr>
        <tr>
          <th colSpan={Math.round(16 / 2)}>Width - {blind?.width} cm</th>
          <th colSpan={Math.round(16 / 2)}>
            height / Drop - {blind?.height} cm
          </th>
        </tr>
        <tr>
          <th>Sno</th>
          <th colSpan={3}>Item</th>
          <th colSpan={3}>Item name</th>
          <th>Qty</th>
          <th>Total Quantity</th>
          <th>Fabric MRP per meter</th>
          <th>Fitting charge</th>
          <th>Hardware Per RFT including taxes</th>

          <th>Gross amount</th>
          <th>Dis </th>
          <th>Net amount including taxes</th>
        </tr>
        {blindList?.map((fabric, fabricIndex) => {
          return (
            <tr>
              <td>{fabricIndex + 1}</td>
              <td colSpan={3}>{fabric?.title}</td>
              <td colSpan={3}>{fabric?.value}</td>
              <td>{fabric?.qty}</td>
              <td>{fabric?.totalFabricInM}</td>
              <td>{fabric?.mrp}</td>
              <td>{fabric?.fittingCharge}</td>
              <td>{fabric?.hardwareSqmt}</td>
              <td>{fabric?.totalPrice}</td>
              <td>{`${fabric?.discount} %`}</td>
              <td>{fabric?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderWallpaper = (wallpaper = [], colspan = 16, room) => {
    const fabrics = wallpaper?.wallpaperList ?? [];
    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    //Helper.log("sofa", fabrics);

    if (fabrics?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colSpan="16">Wallpaper details</th>
        </tr>
        <tr>
          {/* {console.log("wallll.. latest widthh.... ", room)} */}
          {room?.Wallpaper?.wall_information.map((data) => <>
            <th colspan="10">Wallpaper Breadth: {data?.wall_breadth} </th>
            <th colspan="10">Wallpaper Length: {data?.wall_length}</th>
          </>)}

        </tr >
        <tr>
          <th>Sno</th>
          <th colSpan={1}>Item</th>
          <th colSpan={1}>Item Name</th>
          <th colSpan={1}>Type</th>
          <th colSpan={1}>Wall width in cm</th>
          <th colSpan={1}>Wall length in cm</th>
          <th colSpan={1}>Area in SQMT</th>
          <th colSpan={1}>Quantity</th>
          <th colSpan={1}>MRP per roll</th>
          <th colSpan={2}>Gross Amount</th>
          <th colSpan={2}>Dis</th>
          <th colSpan={3}>Net amount including taxes</th>
        </tr>
        {
          fabrics?.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td colSpan={1}>{item?.title}</td>
                <td colSpan={1}>{item?.fabric}</td>
                <td colSpan={1}>{item?.type}</td>
                <td colSpan={1}>{item?.wall_length}</td>
                <td colSpan={1}>{item?.wall_width}</td>
                <td colSpan={1}>{item?.width}</td>
                <td colSpan={1}>{item?.qty}</td>
                <td colSpan={1}>{item?.price}</td>
                <td colSpan={2}>{item?.totalPrice}</td>
                <td colSpan={2}>{item?.discount}%</td>
                <td colSpan={3}>{item?.grandTotal}</td>
              </tr>
            );
          })
        }
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderWallpaperInstallation = (wallpaper = [], colspan = 16, room) => {
    const fabrics = wallpaper?.wallpaperInstallation ?? [];

    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    //Helper.log("sofa", fabrics);

    if (fabrics?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colspan="16">Wallpaper installation</th>
        </tr>
        <tr>
          {room?.Wallpaper?.wall_information.map((data) => <>
            <th colspan="10">Wallpaper Breadth: {data?.wall_breadth} </th>
            <th colspan="10">Wallpaper Length: {data?.wall_length}</th>
          </>)}

        </tr >
        <tr>
          <th>Sno</th>

          <th colSpan="3">Item Name</th>
          <th colSpan="1">Type</th>
          <th colSpan="1">Wall Height</th>
          <th colSpan="1">Wall Width</th>
          <th colSpan="3">Area in SQMT</th>
          <th colSpan="1">Total roll</th>
          <th colSpan="4">Primer Amount</th>
          <th colSpan="4">MRP per SQMT</th>
          <th colSpan="4">Gross Amount</th>
        </tr>

        {fabrics?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td colSpan="3">{item?.title}</td>
              <td colSpan="1">{item?.type}</td>
              <td colSpan={"1"}>{item?.wall_length}</td>
              <td colSpan={"1"}>{item?.wall_width}</td>
              <td colSpan="3">{item?.width}</td>
              <td colSpan="1">{item?.qty}</td>
              <td colSpan={"4"}>{item?.primerPrice}</td>
              <td colSpan="4">{item?.price}</td>
              <td colSpan="4">{item?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };

  const renderRoomCurtain = (
    window = {},
    windowIndex,
    room,
    tax = 0,
    colspan = 16
  ) => {
    const fabrics = window?.fabricList ?? [];
    // console.log("windowww.. .", window,);
    // console.log("rrommm", room)
    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (fabrics.length === 0) return "";
    return (
      <>
        <tr>
          <th colSpan={colspan}>Window - {windowIndex + 1} </th>
        </tr>
        <tr>
          <th colSpan={16 / 2}>Width - {window?.width} cm</th>
          <th colSpan={16 / 2}>Height / Drop - {window?.height} cm</th>

        </tr>
        {/* {console.log("sheer_window_width", room, window)} */}
        <tr style={{ textAlign: "center" }}>
          <th colSpan={16 / 2}>Sheer window Width - {
            window?.measurement?.sheer_window_width ? window?.measurement?.sheer_window_width : 0
          } cm</th>
          <th colSpan={16 / 2}>Sheer window Height / Drop - {
            window?.measurement?.sheer_window_height ? window?.measurement?.sheer_window_height : 0
          } cm</th>
          {/* {console.log("ply required...", room)} */}

        </tr>
        <tr>
          <th colSpan={16 / 2}>Curtain Operation - {room?.roomInfo?.room_assets?.[windowIndex]?.curtain_operation?.operationType} </th>

          <th colSpan={16 / 2}>
            ply wood required -{room?.curtain?.fabric1?.[windowIndex]?.curtain_plywood_required}
          </th>
        </tr>
        <tr>
          <th colSpan={16 / 2}>Pelmet Width - {room?.curtain?.pelmet?.[windowIndex]?.pelmetRequired?.pelmetWidth} cm</th>
          <th colSpan={16 / 2}>Pelmet Height / Drop - {room?.curtain?.pelmet?.[windowIndex]?.pelmetRequired?.pelmetDrop} cm</th>
        </tr>
        {fabrics?.map((fabric, fabricIndex) => {
          return (
            <>
              {fabricIndex === 0 ? (
                <tr>
                  <th>Sno</th>
                  <th>Item</th>
                  <th colSpan="4">Item name</th>
                  <th colSpan="3">Curtain style</th>
                  <th>No of panel</th>
                  <th>Total Quantity</th>
                  <th>MRP per meter including taxes</th>
                  <th>Gross amount</th>
                  <th>Dis</th>
                  <th>Net amount including taxes</th>
                </tr>
              ) : (
                ``
              )}
              <tr>
                {/* {console.log("Fabrice latessttt", fabric)} */}
                <td>{fabricIndex + 1}</td>
                <td>{fabric?.title}</td>
                <td colSpan="4">{fabric?.value}</td>
                <td colSpan="3">{fabric?.curtainStyle} {fabric?.fabric1_ring_color && `(${fabric?.fabric1_ring_color})`} </td>
                <td>{fabric?.noOfPanel}</td>
                <td>{fabric?.totalFabricInM}</td>
                <td>{fabric?.mrp}</td>
                <td>{fabric?.totalPrice}</td>
                <td>{`${fabric?.discount} %`}</td>
                <td>{fabric?.grandTotal}</td>
              </tr>
            </>
          );
        })}
        {renderTotalRoomAmount(totalAmount, colspan)}
      </>
    );
  };

  const renderSofa = (sofa = [], colspan = 16) => {
    const fabrics = sofa?.sofaList ?? [];
    // console.log("ress", sofa);
    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);
    //Helper.log("sofa", fabrics);
    if (fabrics?.length == 0) {
      return "";
    }
    return (
      <>
        <>
          <tr>
            <th colSpan="16">Sofa details</th>
          </tr>
          <tr>
            <th>Sno</th>
            <th colSpan="4">Item</th>
            <th colSpan="1">Item Name</th>
            <th colSpan="1">Type</th>

            <th colSpan="1">Total fabric</th>
            <th colSpan="1">Fabric MRP per mts</th>
            <th colSpan="2">Gross Amount</th>
            <th colSpan="2">Dis</th>
            <th colSpan="3">Net amount including taxes</th>
          </tr>
        </>
        )
        {fabrics?.map((item, index) => (
          <tr>
            {/* {console.log("iteemmmm=======+++>>>>>", item)} */}
            <td>{index + 1}</td>
            <td colSpan="4">{item?.title}</td>
            <td colSpan="1">{item?.fabric}</td>
            <td colSpan="1">{item?.type}</td>
            <td colSpan="1">{item?.qty}</td>
            <td colSpan="1">{item?.price}</td>
            <td colSpan="2">{item?.totalPrice}</td>
            <td colSpan="2">{`${item?.discount}%`}</td>
            <td colSpan="3">{item?.grandTotal}</td>
          </tr>
        ))}
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };

  const renderSofaStitching = (sofa = [], colspan = 16) => {
    const fabrics = sofa?.sofaStitchingList ?? [];

    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    if (fabrics?.length == 0) {
      return "";
    }

    return (
      <>
        <>
          <tr>
            <th colspan="16">Sofa Stitching details</th>
          </tr>
          <tr>
            <th>Sno</th>
            <th colspan="3">Item</th>
            <th colspan="1">Type</th>
            <th colspan="1">Stitching type</th>
            <th colspan="1">Size = Width * Height</th>
            <th colspan="1">No of cushion</th>
            <th colspan="1">No of seat</th>
            <th colspan="1"> MRP per mts / Cost per cushion</th>
            <th colspan="2">Gross Amount</th>
            <th colspan="3">Net amount including taxes</th>
          </tr>
        </>
        {fabrics?.map((item, index) => (

          <tr>
            {/* {console.log(" totall enqieryy chanveee", fabrics)} */}
            <td>{index + 1}</td>
            <td colspan="3">{item?.title}</td>
            <td colspan="1">{item?.type}</td>
            <td colspan="1">{item?.stitchingType}</td>
            <td colspan="1">{item?.size}</td>
            <td colspan="1">{item?.no_of_cushion}</td>
            <td colspan="1">{item?.number_of_seat}</td>
            <td colspan="1">{item?.price}</td>
            <td colspan="2">{item?.totalPrice}</td>
            <td colspan="3">{item?.grandTotal}</td>
          </tr>
        ))}
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };
  const renderFlooring = (flooring = [], colspan = 16, room) => {
    const fabrics = flooring?.flooringList ?? [];

    // console.log('fabbbbbbbbb', room)

    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    //Helper.log("sofa", fabrics);

    if (fabrics?.length == 0) {
      return "";
    }

    return (
      <>
        <>
          <tr>
            <th colspan="16">Flooring details</th>
          </tr>
          <tr>
            <th colspan="10">Flooring Breadth: {room?.flooring?.flooring_breadth} </th>
            <th colspan="10">Flooring Length: {room?.flooring?.flooring_length}</th>
          </tr>
          <tr>
            <th>Sno</th>
            <th colspan="3">Item</th>
            <th colspan="1">Item Name</th>
            <th colspan="1">Type</th>
            <th colspan="1">Area in SQMT</th>
            <th colspan="1">Quantity</th>

            <th colspan="1">Flooring MRP per SQMT</th>
            <th colspan="2">Gross Amount</th>
            <th colspan="2">Dis</th>
            <th colspan="3">Net amount including taxes</th>
          </tr>
        </>
        {fabrics?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td colspan="3">{item?.title}</td>
              <td colspan="1">{item?.fabric}</td>
              <td colspan="1">{item?.type}</td>
              <td colspan="1">{item?.width}</td>
              <td colspan="1">{item?.qty}</td>

              <td colspan="1">{item?.price}</td>
              <td colspan="2">{item?.totalPrice}</td>
              <td colspan="2">{item?.discount ? `${item?.discount}%` : 0}</td>
              <td colspan="3">{item?.grandTotal}</td>
            </tr>
          );
        })}
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };

  const renderFlooringInstalltion = (flooring = [], colspan = 16, room) => {
    const fabrics = flooring?.flooringInstallation ?? [];

    const totalAmount = fabrics?.reduce((sum, fabric) => {
      return (sum = +sum + +fabric?.grandTotal);
    }, 0);

    //Helper.log("sofa", fabrics);

    if (fabrics?.length == 0) {
      return "";
    }

    return (
      <>
        <tr>
          <th colspan="16">Flooring installation</th>
        </tr>
        <tr>
          <th colspan="10">Flooring Breadth: {room?.flooring?.flooring_breadth} </th>
          <th colspan="10">Flooring Length: {room?.flooring?.flooring_length}</th>
        </tr>
        <tr>
          <th>Sno</th>

          <th colspan="3">Item Name</th>
          <th colspan="1">Type</th>
          <th colspan="4">Area in SQMT</th>
          <th colspan="4">MRP per SQMT</th>
          <th colspan="4">Gross Amount</th>
        </tr>
        <>
          {fabrics?.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td colspan="3">{item?.title}</td>
                <td colspan="1">{item?.type}</td>
                <td colspan="4">{item?.width}</td>
                <td colspan="4">{item?.price}</td>
                <td colspan="4">{item?.grandTotal}</td>
              </tr>
            );
          })}
        </>
        {renderTotalRoomAmount(totalAmount, 16)}
      </>
    );
  };

  const getTotalWindowPrice = (room) => {
    //Helper.log("Room=====>>>>>>>", room);
    const fabrics = room?.fabricList ?? [];
    const hardware = room?.hardwareList ?? [];
    const blinds = room?.blind?.blindList ?? [];
    const blindHardwareList = room?.blind?.blindHardwareList ?? [];
    const blindStitchingList = room?.blind?.blindStitchingList ?? [];
    const stitchingList = room?.stitchingList ?? [];
    const sofaList = room?.sofaList ?? [];
    const flooringList = room?.flooringList ?? [];
    const flooringInstallation = room?.flooringInstallation ?? [];
    const sofaStitchingList = room?.sofaStitchingList ?? [];
    const wallpaperList = room?.wallpaperList ?? [];
    const wallpaperInstallation = room?.wallpaperInstallation ?? [];

    let fabricPrice = 0;
    let hardwarePrice = 0;
    let blindPrice = 0;
    let blindHardwarePrice = 0;
    let blindStitchingPrice = 0;
    let curtainStitchingPrice = 0;
    let sofaPrice = 0;
    let flooringPrice = 0;
    let flooringInstallationPrice = 0;
    let sofaStitchingPrice = 0;
    let wallpaperPrice = 0;
    let wallpaperInstallationPrice = 0;

    fabrics?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        fabricPrice = parseFloat(fabricPrice) + parseFloat(item?.grandTotal);
      }
    });

    hardware?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        hardwarePrice =
          parseFloat(hardwarePrice) + parseFloat(item?.grandTotal);
      }
    });

    blinds?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        blindPrice = parseFloat(blindPrice) + parseFloat(item?.grandTotal);
      }
    });

    blindHardwareList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        blindHardwarePrice =
          parseFloat(blindHardwarePrice) + parseFloat(item?.grandTotal);
      }
    });

    blindStitchingList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        blindStitchingPrice =
          parseFloat(blindStitchingPrice) + parseFloat(item?.grandTotal);
      }
    });

    stitchingList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        curtainStitchingPrice =
          parseFloat(curtainStitchingPrice) + parseFloat(item?.grandTotal);
      }
    });

    sofaList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        sofaPrice = parseFloat(sofaPrice) + parseFloat(item?.grandTotal);
      }
    });

    sofaStitchingList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        sofaStitchingPrice =
          parseFloat(sofaStitchingPrice) + parseFloat(item?.grandTotal);
      }
    });

    flooringList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        flooringPrice =
          parseFloat(flooringPrice) + parseFloat(item?.grandTotal);
      }
    });

    flooringInstallation?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        flooringInstallationPrice =
          parseFloat(flooringInstallationPrice) + parseFloat(item?.grandTotal);
      }
    });

    wallpaperList?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        wallpaperPrice =
          parseFloat(wallpaperPrice) + parseFloat(item?.grandTotal);
      }
    });

    wallpaperInstallation?.map((item) => {
      if (item?.grandTotal && item?.grandTotal > 0) {
        wallpaperInstallationPrice =
          parseFloat(wallpaperInstallationPrice) + parseFloat(item?.grandTotal);
      }
    });

    return getPriceFormate(
      parseFloat(fabricPrice) +
      parseFloat(hardwarePrice) +
      parseFloat(blindPrice) +
      parseFloat(blindHardwarePrice) +
      parseFloat(blindStitchingPrice) +
      parseFloat(curtainStitchingPrice) +
      parseFloat(sofaPrice) +
      parseFloat(sofaStitchingPrice) +
      parseFloat(flooringPrice) +
      parseFloat(flooringInstallationPrice) +
      parseFloat(wallpaperPrice) +
      parseFloat(wallpaperInstallationPrice),
    );
  };

  const getLadder = () => {
    const obj = {
      name: "",
      price: 0,
      message: "",
    };
    const ladderCharge = LadderPrice;
    if (rooms && rooms?.length > 0) {
      const roomDetails = rooms[0]?.roomInfo;
      const asset =
        roomDetails?.room_assets && roomDetails?.room_assets?.length > 0
          ? roomDetails?.room_assets[0]
          : "";
      if (asset && asset?.ladder) {
        obj["name"] = asset?.ladder?.ladder;
        obj["message"] = asset?.ladder?.note;
        obj["price"] = ladderCharge;
      }
    }
    return obj;
  };

  const getQty = (qty) => {
    if (
      ["null", "NAN", "NaN", "undefined", "", undefined, null].includes(qty)
    ) {
      return 1;
    }
    return qty;
  };

  const getStitchingDataFormate = ({
    title,
    value,
    noOfPanel,
    stitchingPrice,
    stitchingCost,
    totalFabricInM,
    totalPrice,
    discount,
    grandTotal,
    weightPrice,
    handHammingPrice,
    curtainStyle,
    fabric1_ring_color,
    totalDiscount,
    leadChainPrice,
    runningFeet,
  }) => {
    return {
      title,
      value,
      noOfPanel,
      stitchingPrice,
      stitchingCost,
      totalFabricInM,
      totalPrice,
      discount,
      grandTotal,
      weightPrice,
      handHammingPrice,
      curtainStyle,
      fabric1_ring_color,
      totalDiscount,
      leadChainPrice,
      runningFeet,
    };
  };

  const getRoomStyles = (room, roomIndex) => {
    const roomDetail = room?.roomInfo;
    const getDataFromRoomByKey = key => {
      if (key && room[key]) {
        return room[key];
      }
    };


    const getDataFromFabric = ({
      fabric,
      fabricName,
      title,
      nameKey = 'fabric1_name',
      isPriceSquareMeter,
      curtainStyle,
      fabric1_ring_color,
      widthInFeet,
      qty,
      totalFabricInM,
      isTotalAmountIsGrossAmount,
      custom_title,
      runningFeet,
    }) => {

      const getGrandTotalAmount = () => {
        if (isTotalAmountIsGrossAmount) {
          if (fabric?.gross_amount) {
            return getPriceFormate(fabric?.gross_amount);
          }
        }
        return fabric?.netAmount ? getPriceFormate(fabric?.netAmount) : '';
      };

      return getMaterialFormate({
        title: title,
        value: fabricName ? fabricName : fabric[nameKey] ? fabric[nameKey] : '',
        type: fabric?.type,
        unit: fabric?.unit,
        mrp: isPriceSquareMeter ? '' : fabric?.mrp ? fabric?.mrp : '',
        discount: getEmptyValue(fabric?.discount) ? getEmptyValue(fabric?.discount) : 0,
        noOfPanel: fabric?.number_of_panel ? fabric?.number_of_panel : '',
        stitchingCost: fabric?.stitchingCost
          ? getPriceFormate(fabric?.stitchingCost)
          : '',
        stitchingPrice: getPriceFormate(fabric?.stitchinPrice),
        totalDiscount: getPriceFormate(fabric?.discountedAmount),
        totalFabricInM: totalFabricInM
          ? totalFabricInM
          : getTotalFabric(fabric?.totalFabricUse),
        grandTotal: getGrandTotalAmount(),
        curtainStyle: curtainStyle
          ? curtainStyle
          : fabric?.curtain_style
            ? fabric?.curtain_style?.curtainStyle
            : '',
        fabric1_ring_color: fabric1_ring_color ? fabric1_ring_color :
          fabric?.fabric1_ring_color ? fabric?.fabric1_ring_color : "",
        totalPrice: fabric?.gross_amount
          ? getPriceFormate(fabric?.gross_amount)
          : '',
        totalTax: fabric?.tax_amount ? getPriceFormate(fabric?.tax_amount) : '',
        qty: qty
          ? getQty(qty)
          : fabric?.number_of_item
            ? getQty(fabric?.number_of_item)
            : '',
        widthInFeet: widthInFeet
          ? widthInFeet
          : fabric?.width
            ? getTotalFabric(fabric?.width)
            : '',
        tax: fabric?.tax ? fabric?.tax : '',
        fittingCharge: fabric?.fittingCharges
          ? getPriceFormate(fabric?.fittingCharges)
          : '',
        hardwareSqmt: isPriceSquareMeter ? (fabric?.mrp ? fabric?.mrp : '') : '',
        custom_title: custom_title,
        runningFeet,
      });
    };

    const getDataForStitching = ({
      fabric,
      title,
      curtainStyle,
      fabric1_ring_color,
      leadChainPrice = 0,
      _stitchingCost = 0,
      _stitchingPrice = 0,
      noOfPanel = 0,
      _weightPrice = 0,
      _totalAmount = 0,
      _handHammingPrice = 0,
      runningFeet,
    }) => {
      const getStitchingPrice = () => {
        if (_stitchingPrice) {
          return _stitchingPrice;
        }
        return getPriceFormate(fabric?.stitchinPrice);
      };

      const getTotalStitchingCost = () => {
        if (_stitchingCost) {
          return _stitchingCost;
        }
        return fabric?.curtain_style_cost
          ? getPriceFormate(fabric?.curtain_style_cost)
          : 0;
      };

      if (fabric) {
        const stitchingCost = getTotalStitchingCost();
        const handHammingPrice = _handHammingPrice
          ? _handHammingPrice
          : fabric?.handHammering_cost
            ? fabric?.handHammering_cost
            : 0;
        const weightPrice = _weightPrice
          ? _weightPrice
          : fabric?.weight_price
            ? fabric?.weight_price
            : 0;
        const totalDiscount = 0; // getPriceFormate(fabric?.discountedAmount);

        const getTotalAmount = () => {
          if (_totalAmount) {
            return _totalAmount;
          }
          return getPriceFormate(
            parseFloat(stitchingCost) +
            parseFloat(handHammingPrice) +
            parseFloat(weightPrice) +
            parseFloat(leadChainPrice),
          );
        };

        const getNetAmount = () => {
          const totalPrice = getTotalAmount();
          return getPriceFormate(totalPrice);
        };

        return getStitchingDataFormate({
          title: title,
          noOfPanel: noOfPanel
            ? noOfPanel
            : fabric?.number_of_panel
              ? fabric?.number_of_panel
              : '',
          stitchingCost: stitchingCost,
          stitchingPrice: getStitchingPrice(),
          totalPrice: getTotalAmount(),
          handHammingPrice: handHammingPrice,
          weightPrice: weightPrice,
          curtainStyle: curtainStyle
            ? curtainStyle
            : fabric?.curtain_style
              ? fabric?.curtain_style?.curtainStyle
              : '',
          fabric1_ring_color: fabric1_ring_color ? fabric1_ring_color : fabric?.fabric1_ring_color ? fabric?.fabric1_ring_color : "",
          discount: fabric?.discount ? fabric?.discount : '',
          totalDiscount: totalDiscount,
          grandTotal: getNetAmount(),
          leadChainPrice: leadChainPrice,
          runningFeet,
        });
      }
      return undefined;
    };

    const getDataForSofa = ({
      fabric,
      title,
      discount,
      totalDiscount,
      totalPrice,
      grandTotal,
      price,
      number_of_seat,
      qty = '',
      type,
      no_of_cushion,
      size,
      stitchingType,
    }) => {
      return {
        fabric,
        title,
        discount: discount,
        totalDiscount: getPriceFormate(totalDiscount),
        totalPrice: getPriceFormate(totalPrice),
        grandTotal: getPriceFormate(grandTotal),
        price: getPriceFormate(price),
        number_of_seat,
        qty,
        type,
        no_of_cushion,
        size,
        stitchingType,
      };
    };

    const getDataForFlooring = ({
      fabric,
      title,
      discount,
      totalDiscount,
      totalPrice,
      grandTotal,
      price,
      qty,
      type = '',
      width = '',
      installationCharge = '',
      primerPrice,
      door_cut_cost,
      wall_width,
      wall_length,
      wastage,
    }) => {
      const _totalPrice = qty * price;

      return {
        fabric,
        title,
        discount: discount,
        totalDiscount: getPriceFormate(totalDiscount),
        totalPrice: totalPrice
          ? getPriceFormate(totalPrice)
          : getPriceFormate(_totalPrice),
        grandTotal: getPriceFormate(grandTotal),
        price: getPriceFormate(price),
        qty: qty ?? '',
        type,
        width,
        installationCharge,
        primerPrice: getPriceFormate(primerPrice),
        door_cut_cost: getPriceFormate(door_cut_cost),
        wall_width,
        wall_length,
        wastage,
      };
    };

    const window = [];

    const getAssetDataByKey = (assets = [], index, key) => {
      if (assets && assets.length > 0 && assets[index] && assets[index][key]) {
        return assets[index][key];
      }
      return '';
    };

    const getBlindMinimumWidth = blindData => {
      if (blindData) {
        const top_width = blindData?.blind_width_top
          ? blindData?.blind_width_top
          : '';
        const middle_width = blindData?.blind_width_middle
          ? blindData?.blind_width_middle
          : '';
        const bottom_width = blindData?.blind_width_bottom
          ? blindData?.blind_width_bottom
          : '';
        const width = Math.min(...[top_width, middle_width, bottom_width]);
        return width;
      }
      return 0;
    };

    const getBlindMinimumHeight = blindData => {
      if (blindData) {
        const left_height = blindData?.blind_drop_left
          ? blindData?.blind_drop_left
          : '';
        const right_height = blindData?.blind_drop_right
          ? blindData?.blind_drop_right
          : '';
        const blind_drop_middle = blindData?.blind_drop_middle
          ? blindData?.blind_drop_middle
          : '';

        const height = Math.min(
          ...[left_height, right_height, blind_drop_middle],
        );
        return height;
      }
      return 0;
    };

    if (roomDetail) {
      const windowList = Array(roomDetail?.room_assets?.length).fill(1);
      if (windowList.length == 0) {
        windowList.push(1);
      }
      const room_assets = roomDetail?.room_assets
        ? [...roomDetail?.room_assets]
        : [];

      const roomCategory =
        roomDetail?.selectedMaterial?.length > 0
          ? [...roomDetail?.selectedMaterial]
          : [];
      const flooringStyle = roomDetail?.selectedFlooring;
      const sofaStyleList = roomDetail?.selectedsofa;

      let wallpaperStyle = '';
      if (Helper.isHaveCategory(roomCategory, MaterialCategoryName?.Wallpaper)) {
        wallpaperStyle = roomDetail?.selectedWallpaper;
      }

      windowList.map((_, index) => {
        const assetId = _['assetId'] ? _['assetId'] : undefined;
        const window_width = getAssetDataByKey(room_assets, index, 'width');
        const window_height = getAssetDataByKey(room_assets, index, 'height');
        const curtain_operation =
          getAssetDataByKey(room_assets, index, 'curtain_operation')
            ?.operationType ?? '';
        const sheer_window_width = getAssetDataByKey(
          room_assets,
          index,
          'sheer_window_width',
        );
        const sheer_window_height = getAssetDataByKey(
          room_assets,
          index,
          'sheer_window_height',
        );
        const blindStyle = getAssetDataByKey(room_assets, index, 'selectedBlind');

        const obj = {};
        obj['window'] = index + 1;
        obj['width'] = window_width;
        obj['height'] = window_height;

        const fabricList = [];
        const hardwareList = [];
        const stitchingList = [];
        const blindHardwareList = [];
        const blindStitchingList = [];
        const sofaList = [];
        const sofaStitchingList = [];
        const flooringList = [];
        const flooringInstallation = [];
        const wallpaperList = [];
        const wallpaperInstallation = [];

        const measurement = {};
        measurement['curtain_operation'] = curtain_operation;

        const blindData = {};

        const curtain = getDataFromRoomByKey('curtain');
        const rod = getDataFromRoomByKey('rod');
        const track = getDataFromRoomByKey('track');
        const sheer = getDataFromRoomByKey('sheer');
        const blind = getDataFromRoomByKey('blind');
        const extraHardware = getDataFromRoomByKey('extra_hardware');
        const sofa = getDataFromRoomByKey('sofa');
        const flooring = getDataFromRoomByKey('flooring');
        const wallpaper = getDataFromRoomByKey('Wallpaper');


        const getWallBreadthAndLength = index => {
          const obj = {
            breadth: 0,
            length: 0,
          };

          if (wallpaperStyle[index]) {
            if (wallpaperStyle[index]?.wallpaperareas[0]) {
              obj['breadth'] = wallpaperStyle[index]?.wallpaperareas[0]?.windowBreadth;
              obj['length'] = wallpaperStyle[index]?.wallpaperareas[0]?.windowLength;
            }
          }

          return obj;
        };

        const getLengthAndWidth = item => {
          return `${item?.width} * ${item?.length}`;
        };

        if (curtain) {
          if (curtain?.fabric1 && curtain?.fabric1[index]) {
            const fabric = curtain?.fabric1[index];

            fabricList.push(
              getDataFromFabric({
                fabric: fabric,
                title: 'Main curtain fabric1',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Main Curtain stitching',
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.fabric2 && curtain?.fabric2[index]) {
            const fabric = curtain?.fabric2[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Main curtain fabric2',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Main Curtain stitching 2',
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.mock_fabric && curtain?.mock_fabric[index]) {
            const fabric = curtain?.mock_fabric[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Mock curtain fabric',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Mock Curtain stitching',
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.lining_fabric && curtain?.lining_fabric[index]) {
            const fabric = curtain?.lining_fabric[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Lining fabric',
                curtainStyle: fabric?.curtain_style,
                fabric1_ring_color: fabric?.fabric1_ring_color,
              }),
            );
          }
          if (curtain?.belt && curtain?.belt[index]) {
            const fabric = curtain?.belt[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Belt fabric',
                nameKey: 'fabric1_name',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Belt fabric stitching',
              _stitchingCost: fabric?.stitchinPrice ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }

          if (curtain?.beltBorder && curtain?.beltBorder[index]) {
            const fabric = curtain?.beltBorder[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Belt border fabric',
                nameKey: 'fabric1_name',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Belt border stitching',
              _stitchingCost: fabric?.stitchinPrice ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }

          if (curtain?.beltPiping && curtain?.beltPiping[index]) {
            const fabric = curtain?.beltPiping[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Belt piping fabric',
                nameKey: 'fabric1_name',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Belt piping stitching',
              _stitchingCost: fabric?.stitchinPrice ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }

          if (curtain?.primary_border && curtain?.primary_border[index]) {
            const fabric = curtain?.primary_border[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Primary border fabric',
                nameKey: 'fabric1_name',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Primary border stitching',
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.secondary_border && curtain?.secondary_border[index]) {
            const fabric = curtain?.secondary_border[index];
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Secondary border fabric',
                nameKey: 'fabric1_name',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Secondary border stitching',
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
          if (curtain?.pelmet && curtain?.pelmet[index]) {
            const fabric = curtain?.pelmet[index];
            if (fabric?.pelmetRequired) {
              measurement['pelmetWidth'] = fabric?.pelmetRequired?.pelmetWidth;
              measurement['pelmetDrop'] = fabric?.pelmetRequired?.pelmetDrop;
            }
            fabricList.push(
              getDataFromFabric({
                fabric,
                title: 'Pelmet fabric',
                nameKey: 'fabric1_name',
              }),
            );

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Pelmet stitching with fitting charge',
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
              noOfPanel: fabric?.width ? `${fabric?.width} ft` : '',
              _weightPrice: fabric?.fittingCharges,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
        }
        if (sheer) {
          if (sheer?.fabric && sheer?.fabric[index]) {
            const fabric = sheer?.fabric[index];
            fabricList.push(
              getDataFromFabric({
                fabric: fabric,
                title: 'Sheer fabric',
                curtainStyle: fabric?.curtain_style,
                fabric1_ring_color: fabric?.fabric1_ring_color
              }),
            );

            measurement['sheer_window_height'] = sheer_window_height;
            measurement['sheer_window_width'] = sheer_window_width;

            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Sheer Curtain stitching',
              leadChainPrice: fabric?.leadChain_cost,
              _stitchingPrice: fabric?.stitchinPrice,
              _stitchingCost: fabric?.stitchingCost,
              _totalAmount: fabric?.stitchingCost,
              _handHammingPrice: fabric?.handHammeringStiching,
              curtainStyle: fabric?.curtain_style,
              fabric1_ring_color: fabric?.fabric1_ring_color,
              noOfPanel: fabric?.number_of_panel,
            });
            if (stitchingData) {
              stitchingList.push(stitchingData);
            }
          }
        }
        if (true) {
          if (rod) {
            if (rod?.primary_rod && rod?.primary_rod[index]) {
              const fabric = rod?.primary_rod[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Primary rod',
                  isPriceSquareMeter: true,
                }),
              );
            }
            if (rod?.secondary_rod && rod?.secondary_rod[index]) {
              const fabric = rod?.secondary_rod[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Secondary rod',
                  isPriceSquareMeter: true,
                }),
              );
            }
            if (rod?.finial && rod?.finial[index]) {
              const fabric = rod?.finial[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Rod Finial',
                }),
              );
            }
            if (rod?.curtainStick && rod?.curtainStick[index]) {
              const fabric = rod?.curtainStick[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Rod curtain stick',
                }),
              );
            }
            if (rod?.endCapWallSupport && rod?.endCapWallSupport[index]) {
              const fabric = rod?.endCapWallSupport[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Rod end cap wall support',
                }),
              );
            }
            if (rod?.extraBracket && rod?.extraBracket[index]) {
              const fabric = rod?.extraBracket[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Rod extra bracket',
                }),
              );
            }
            if (rod?.endCap && rod?.endCap[index]) {
              const fabric = rod?.endCap[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Rod end cap',
                }),
              );
            }
            if (rod?.rodTieKnob && rod?.rodTieKnob[index]) {
              const fabric = rod?.rodTieKnob[index];
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Rod tie knob',
                }),
              );
            }
          }
          if (track) {
            if (true) {
              //primary track
              if (track?.primary_track && track?.primary_track[index]) {
                const fabric = Helper.getTrackNameWithLength({
                  name: track?.primary_track[index]?.fabric1_name,
                  length: track?.primary_track[index]?.track_length ?? '',
                });
                hardwareList.push(
                  getDataFromFabric({
                    fabricName: fabric,
                    fabric: track?.primary_track[index],
                    title: 'Primary Track',
                    isPriceSquareMeter: true,
                  }),
                );
              }
              if (track?.primaryTrackMotor && track?.primaryTrackMotor[index]) {
                const fabric = track?.primaryTrackMotor[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Primary Track motor',
                    widthInFeet: '0',
                  }),
                );
              }
              if (track?.primaryTrackRemote && track?.primaryTrackRemote[index]) {
                const fabric = track?.primaryTrackRemote[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Primary Track motor remote',
                    qty: fabric?.totalFabricUse,
                    widthInFeet: '0',
                  }),
                );
              }
              if (track?.primary_overlapper && track?.primary_overlapper[index]) {
                const fabric = track?.primary_overlapper[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Primary Track over lapper',
                  }),
                );
              }
              if (
                track?.primary_track_curatin_stick &&
                track?.primary_track_curatin_stick[index]
              ) {
                const fabric = track?.primary_track_curatin_stick[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Primary Track curtain stick',
                  }),
                );
              }
              if (
                track?.primary_extra_track_bracket &&
                track?.primary_extra_track_bracket[index]
              ) {
                const fabric = track?.primary_extra_track_bracket[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Primary Track extra bracket',
                  }),
                );
              }

              if (track?.Lbracket && track?.Lbracket[index]) {
                const fabric = track?.Lbracket[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'L bracket',
                  }),
                );
              }
              if (
                track?.primary_track_tieknob &&
                track?.primary_track_tieknob[index]
              ) {
                const fabric = track?.primary_track_tieknob[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Primary track tie knob',
                  }),
                );
              }
            }

            if (true) {
              if (
                track?.secondary_track_data &&
                track?.secondary_track_data[index]
              ) {
                const fabric = Helper.getTrackNameWithLength({
                  name: track?.secondary_track_data[index]?.fabric1_name,
                  length: track?.secondary_track_data[index]?.track_length ?? '',
                });
                hardwareList.push(
                  getDataFromFabric({
                    fabric: track?.secondary_track_data[index],
                    fabricName: fabric,
                    title: 'Secondary Track',
                    isPriceSquareMeter: true,
                  }),
                );
              }
              if (
                track?.secondaryTrackMotor &&
                track?.secondaryTrackMotor[index]
              ) {
                const fabric = track?.secondaryTrackMotor[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Secondary Track motor',
                    widthInFeet: '0',
                  }),
                );
              }
              if (
                track?.secondaryTrackRemote &&
                track?.secondaryTrackRemote[index]
              ) {
                const fabric = track?.secondaryTrackRemote[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Secondary Track motor remote',
                    qty: fabric?.totalFabricUse,
                    widthInFeet: '0',
                  }),
                );
              }
              if (
                track?.secondary_overlappper &&
                track?.secondary_overlappper[index]
              ) {
                const fabric = track?.secondary_overlappper[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Secondary track over lapper',
                  }),
                );
              }
              if (
                track?.secondary_track_curatin_stick &&
                track?.secondary_track_curatin_stick[index]
              ) {
                const fabric = track?.secondary_track_curatin_stick[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Secondary track curtain stick',
                  }),
                );
              }
              if (
                track?.secondary_extra_track_bracket &&
                track?.secondary_extra_track_bracket[index]
              ) {
                const fabric = track?.secondary_extra_track_bracket[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Secondary track extra bracket',
                  }),
                );
              }
            }

            if (true) {
              if (track?.mock_track_data && track?.mock_track_data[index]) {
                const fabric = track?.mock_track_data[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Mock track',
                    isPriceSquareMeter: true,
                  }),
                );
              }
              if (track?.mockTrackMotor && track?.mockTrackMotor[index]) {
                const fabric = track?.mockTrackMotor[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Mock Track motor',
                    widthInFeet: '0',
                  }),
                );
              }
              if (track?.mockTrackRemote && track?.mockTrackRemote[index]) {
                const fabric = track?.mockTrackRemote[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Mock Track motor remote',
                    qty: fabric?.totalFabricUse,
                    widthInFeet: '0',
                  }),
                );
              }
              if (track?.mock_overlappper && track?.mock_overlappper[index]) {
                const fabric = track?.mock_overlappper[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Mock track over lapper',
                  }),
                );
              }
              if (
                track?.mock_track_curatin_stick &&
                track?.mock_track_curatin_stick[index]
              ) {
                const fabric = track?.mock_track_curatin_stick[index];
                hardwareList.push(
                  getDataFromFabric({
                    fabric: fabric,
                    title: 'Mock track curtain stick',
                  }),
                );
              }
            }
          }
          if (true) {
            // for extra hardware
            if (extraHardware && extraHardware?.extra_hardware) {
              const fabric = extraHardware?.extra_hardware;
              hardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Extra hardware',
                  isTotalAmountIsGrossAmount: true,
                }),
              );
            }
          }
        }

        if (blind) {
          const blindList = [];

          const blind_width = getBlindMinimumWidth(
            getAssetDataByKey(room_assets, index, 'blind_asset'),
          );
          const blind_height = getBlindMinimumHeight(
            getAssetDataByKey(room_assets, index, 'blind_asset'),
          );
          blindData['width'] = blind_width;
          blindData['height'] = blind_height;

          if (blind?.blindFabricArr && blind?.blindFabricArr[index]) {
            const fabric = blind?.blindFabricArr[index];

            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: 'Blind fabric',
                runningFeet: fabric?.runningFeet,
              }),
            );
            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Blind fabric stitching',
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
              runningFeet: fabric?.runningFeet,
            });
            if (stitchingData) {
              blindStitchingList.push(stitchingData);
            }
          }
          if (blind?.blindLiningArr && blind?.blindLiningArr[index]) {
            const fabric = blind?.blindLiningArr[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: 'Blind Lining',
              }),
            );
          }
          if (
            blind?.blind_type_search_fabric &&
            blind?.blind_type_search_fabric[index]
          ) {
            const fabric = blind?.blind_type_search_fabric[index];
            const fabricName = `${fabric.fabric1_name} (width - ${blind_width}, height - ${blind_height})`;
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                fabricName: fabricName,
                title: 'Blind type',
              }),
            );
          }
          if (blind?.blindShadesArr && blind?.blindShadesArr[index]) {
            const fabric = blind?.blindShadesArr[index];

            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: 'Blind pelmet',
                custom_title: blindStyle?.blind_custom_title,
              }),
            );
          }
          if (blind?.blindBorderFabricArr && blind?.blindBorderFabricArr[index]) {
            const fabric = blind?.blindBorderFabricArr[index];
            blindList.push(
              getDataFromFabric({
                fabric: fabric,
                title: 'Blind border fabric',
                runningFeet: fabric?.totalFabricUse,
              }),
            );
            const stitchingData = getDataForStitching({
              fabric: fabric,
              title: 'Blind Border stitching',
              _stitchingPrice: fabric?.stitchingPrice ?? 0,
              _stitchingCost: fabric?.stitchingCost ?? 0,
              runningFeet: fabric?.totalFabricUse,
            });
            if (stitchingData) {
              blindStitchingList.push(stitchingData);
            }
          }

          if (true) {
            //for blind hardware
            if (blind?.blindTrack && blind?.blindTrack[index]) {
              const fabric_item = blind?.blindTrack[index];
              const fabric = Helper.getTrackNameWithLength({
                name: blind?.blindTrack[index]?.fabric1_name,
                length: blind?.blindTrack[index]?.blind_track_length ?? '',
              });
              blindHardwareList.push(
                getDataFromFabric({
                  fabricName: fabric,
                  fabric: blind?.blindTrack[index],
                  title: 'Blind track',
                  isPriceSquareMeter: true,
                  qty: `${getPriceFormate(fabric_item?.width) > 0
                    ? getPriceFormate(fabric_item?.width) + ' ft'
                    : ''
                    }`,
                }),
              );
            }
            if (blind?.blind_track_motor && blind?.blind_track_motor[index]) {
              const fabric = blind?.blind_track_motor[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Blind track motor',
                  isPriceSquareMeter: true,
                }),
              );
            }
            if (blind?.blindTrackRemote && blind?.blindTrackRemote[index]) {
              const fabric = blind?.blindTrackRemote[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Blind track motor remote',
                  isPriceSquareMeter: true,
                  qty: fabric?.totalFabricUse,
                  widthInFeet: '0',
                  totalFabricInM: '',
                }),
              );
            }
            if (blind?.blindExtraBracket && blind?.blindExtraBracket[index]) {
              const fabric = blind?.blindExtraBracket[index];
              blindHardwareList.push(
                getDataFromFabric({
                  fabric: fabric,
                  title: 'Blind extra bracket',
                  isPriceSquareMeter: true,
                  qty: fabric?.totalFabricUse,
                  widthInFeet: '0',
                  totalFabricInM: ' ',
                }),
              );
            }
          }
          blindData['blindList'] = blindList;
          blindData['blindHardwareList'] = blindHardwareList;
          blindData['blindStitchingList'] = blindStitchingList;
        }

        if (sofa && sofa?.length > 0) {
          sofa?.map((_item, key) => {
            // const sofaStyle = sofaStyleList.find((sofaItem) => sofaItem?.type == _item?.type);
            const sofaStyle = sofaStyleList[key] ? sofaStyleList[key] : '';

            if (sofaStyle) {
              if (_item?.type === SofaSelectionType?.sofa) {
                if (
                  sofaStyle &&
                  Helper.getApiCheckboxSelectedValue(sofaStyle?.sofa_required)
                ) {
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.primary_sofa_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Primary fabric`,
                        fabric: _item?.primary_fabric,
                        qty: _item?.primary_fabric_qty,
                        price: _item?.primary_fabric_price,
                        totalPrice: _item?.primary_fabric_cost,
                        discount: _item?.primary_fabric_discount,
                        grandTotal: _item?.net_primary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                    sofaStitchingList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, fabric stitching`,
                        number_of_seat: _item?.number_of_seats,
                        price: _item?.cost_per_seat,
                        grandTotal: _item?.total_making_cost_with_tax,
                        totalPrice: _item?.total_making_cost,
                        type: _item?.type,
                        stitchingType: sofaStyle?.stiching_type,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.secondary_sofa_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Secondary fabric`,
                        fabric: _item?.secondary_fabric,
                        qty: _item?.secondary_fabric_qty,
                        price: _item?.secondary_fabric_price,
                        totalPrice: _item?.secondary_fabric_cost,
                        discount: _item?.secondary_fabric_discount,
                        grandTotal: _item?.net_secondary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.piping_sofa_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Piping fabric`,
                        fabric: _item?.piping_fabric,
                        qty: _item?.piping_fabric_qty,
                        price: _item?.piping_fabric_price,
                        totalPrice: _item?.piping_fabric_cost,
                        discount: _item?.piping_fabric_discount,
                        grandTotal: _item?.net_piping_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                }
              }

              if (_item?.type === SofaSelectionType?.BedBack) {
                if (
                  sofaStyle &&
                  Helper.getApiCheckboxSelectedValue(sofaStyle?.bedback_required)
                ) {
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.primary_bedback_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Primary fabric`,
                        fabric: _item?.primary_fabric,
                        qty: _item?.primary_fabric_qty,
                        price: _item?.primary_fabric_price,
                        totalPrice: _item?.primary_fabric_cost,
                        discount: _item?.primary_fabric_discount,
                        grandTotal: _item?.net_primary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                    sofaStitchingList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, fabric stitching`,
                        number_of_seat: ' ',
                        price: _item?.making_cost_sqmt,
                        grandTotal: _item?.total_making_cost_with_tax,
                        totalPrice: _item?.total_making_cost,
                        type: _item?.type,
                        size: _item?.total_area,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.secondary_bedback_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Secondary fabric`,
                        fabric: _item?.secondary_fabric,
                        qty: _item?.secondary_fabric_qty,
                        price: _item?.secondary_fabric_price,
                        totalPrice: _item?.secondary_fabric_cost,
                        discount: _item?.secondary_fabric_discount,
                        grandTotal: _item?.net_secondary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                }
              }
              if (_item?.type === SofaSelectionType?.WallPanel) {
                if (
                  sofaStyle &&
                  Helper.getApiCheckboxSelectedValue(
                    sofaStyle?.wallpanel_required,
                  )
                ) {
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.primary_wallpanel_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Primary fabric`,
                        fabric: _item?.primary_fabric,
                        qty: _item?.primary_fabric_qty,
                        price: _item?.primary_fabric_price,
                        totalPrice: _item?.primary_fabric_cost,
                        discount: _item?.primary_fabric_discount,
                        grandTotal: _item?.net_primary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                    sofaStitchingList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, fabric stitching`,
                        number_of_seat: ' ',
                        price: _item?.making_cost_sqmt,
                        grandTotal: _item?.total_making_cost_with_tax,
                        totalPrice: _item?.total_making_cost,
                        type: _item?.type,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.secondary_wallpanel_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Secondary fabric`,
                        fabric: _item?.secondary_fabric,
                        qty: _item?.secondary_fabric_qty,
                        price: _item?.secondary_fabric_price,
                        totalPrice: _item?.secondary_fabric_cost,
                        discount: _item?.secondary_fabric_discount,
                        grandTotal: _item?.net_secondary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                }
              }
              if (_item?.type === SofaSelectionType?.Pouffe) {
                if (
                  sofaStyle &&
                  Helper.getApiCheckboxSelectedValue(sofaStyle?.pouffee_required)
                ) {
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.primary_pouffee_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Primary fabric`,
                        fabric: _item?.primary_fabric,
                        qty: _item?.primary_fabric_qty,
                        price: _item?.primary_fabric_price,
                        totalPrice: _item?.primary_fabric_cost,
                        discount: _item?.primary_fabric_discount,
                        grandTotal: _item?.net_primary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                    sofaStitchingList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, fabric stitching`,
                        number_of_seat: ' ',
                        price: _item?.cost_per_pouffee,
                        grandTotal: _item?.total_making_cost_with_tax,
                        totalPrice: _item?.total_making_cost,
                        type: _item?.type,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.secondary_pouffee_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Secondary fabric`,
                        fabric: _item?.secondary_fabric,
                        qty: _item?.secondary_fabric_qty,
                        price: _item?.secondary_fabric_price,
                        totalPrice: _item?.secondary_fabric_cost,
                        discount: _item?.secondary_fabric_discount,
                        grandTotal: _item?.net_secondary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.piping_pouffee_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Piping fabric`,
                        fabric: _item?.piping_fabric,
                        qty: _item?.piping_fabric_qty,
                        price: _item?.piping_fabric_price,
                        totalPrice: _item?.piping_fabric_cost,
                        discount: _item?.piping_fabric_discount,
                        grandTotal: _item?.piping_fabric_cost,
                        type: _item?.type,
                      }),
                    );
                  }
                }
              }
              if (_item?.type === SofaSelectionType?.cushion) {
                if (
                  sofaStyle &&
                  Helper.getApiCheckboxSelectedValue(sofaStyle?.cushion_required)
                ) {
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.cushion_primary_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Primary fabric`,
                        fabric: _item?.primary_fabric,
                        qty: _item?.primary_fabric_qty,
                        price: _item?.primary_fabric_price,
                        totalPrice: _item?.primary_fabric_cost,
                        discount: _item?.primary_fabric_discount,
                        grandTotal: _item?.net_primary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                    sofaStitchingList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, fabric stitching`,
                        number_of_seat: ' ',
                        price: _item?.cost_per_cushion,
                        grandTotal: _item?.total_making_cost_with_tax,
                        totalPrice: _item?.total_making_cost,
                        type: _item?.type,
                        no_of_cushion: _item?.number_of_cushion,
                        size: getLengthAndWidth(_item),
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.cushion_secondary_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Secondary fabric`,
                        fabric: _item?.secondary_fabric,
                        qty: _item?.secondary_fabric_qty,
                        price: _item?.secondary_fabric_price,
                        totalPrice: _item?.secondary_fabric_cost,
                        discount: _item?.secondary_fabric_discount,
                        grandTotal: _item?.net_secondary_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                  if (
                    Helper.getApiCheckboxSelectedValue(
                      sofaStyle?.cushion_piping_fabric_required,
                    )
                  ) {
                    sofaList?.push(
                      getDataForSofa({
                        title: `Sofa-${key + 1}, Piping fabric`,
                        fabric: _item?.piping_fabric,
                        qty: _item?.piping_fabric_qty,
                        price: _item?.piping_fabric_price,
                        totalPrice: _item?.piping_fabric_cost,
                        discount: _item?.piping_fabric_discount,
                        grandTotal: _item?.net_piping_fabric_price,
                        type: _item?.type,
                      }),
                    );
                  }
                }
              }
            }
          });
        }

        if (
          Helper.getApiCheckboxSelectedValue(flooringStyle?.flooring_required) &&
          flooring
        ) {
          const flooringItems = flooring?.flooringItems;

          if (flooring?.fabric1_name) {
            measurement['flooring_width'] = flooring?.flooring_breadth;
            measurement['flooring_length'] = flooring?.flooring_length;

            flooringList?.push(
              getDataForFlooring({
                title: 'Flooring type',
                fabric: flooring?.fabric1_name,
                price: flooring?.mrp,
                qty: flooring?.totalFabricUse,
                totalPrice: flooring?.gross_amount,
                discount: flooring?.discount,
                totalDiscount: flooring?.discountedAmount,
                grandTotal: flooring?.netAmount,
                type: flooring?.type,
                installationCharge: flooring?.installation_charge,
                width: flooring?.width,
                door_cut_cost: flooring?.door_cut_cost,
                wall_length: flooring?.flooring_length,
                wall_width: flooring?.flooring_breadth,
              }),
            );

            flooringInstallation.push(
              getDataForFlooring({
                title: 'Flooring installation',
                fabric: '',
                price: flooring?.installation_charge,
                grandTotal: flooring?.totalFlooringInstallationCost,
                width: flooring?.width,
                type: flooring?.flooring_type,
              }),
            );
          }

          if (
            Helper.getApiCheckboxSelectedValue(
              flooringItems?.flooring_foam_required,
            )
          ) {
            flooringList?.push(
              getDataForFlooring({
                title: 'Foam',
                fabric: '',
                price: flooring?.FoamPrice,
                grandTotal: flooring?.FoamPrice,
                totalPrice: flooring?.FoamPrice,
                discount: 0,
                width: flooring?.width,
              }),
            );
          }

          if (
            Helper.getApiCheckboxSelectedValue(
              flooringItems?.flooring_polythene_required,
            )
          ) {
            flooringList?.push(
              getDataForFlooring({
                title: 'Polythene',
                fabric: '',
                price: flooring?.polythenePrice,
                grandTotal: flooring?.polythenePrice,
                totalPrice: flooring?.polythenePrice,
                discount: 0,
                width: flooring?.width,
              }),
            );
          }

          if (flooringItems) {
            if (
              Helper.getApiCheckboxSelectedValue(flooringItems?.binding_required)
            ) {
              flooringList?.push(
                getDataForFlooring({
                  title: 'Binding',
                  fabric: flooringItems?.binding,
                  qty: flooringItems?.binding_quantity,
                  price: flooringItems?.binding_mrp,
                  discount: flooringItems?.binding_discount,
                  totalPrice: flooringItems?.binding_cost,
                  grandTotal: flooringItems?.binding_cost,
                }),
              );
            }
            if (
              Helper.getApiCheckboxSelectedValue(flooringItems?.skirting_required)
            ) {
              flooringList?.push(
                getDataForFlooring({
                  title: 'Skirting',
                  fabric: flooringItems?.skirting,
                  qty: flooringItems?.skirting_quantity,
                  price: flooringItems?.skirting_mrp,
                  discount: flooringItems?.skirting_discount,
                  totalPrice: flooringItems?.skirting_cost,
                  grandTotal: flooringItems?.skirting_cost,
                }),
              );
            }

            if (
              Helper.getApiCheckboxSelectedValue(flooringItems?.reducer_required)
            ) {
              flooringList?.push(
                getDataForFlooring({
                  title: 'Reducer',
                  fabric: flooringItems?.reducer,
                  qty: flooringItems?.reducer_quantity,
                  price: flooringItems?.reducer_mrp,
                  discount: flooringItems?.reducer_discount,
                  totalPrice: flooringItems?.reducer_cost,
                  grandTotal: flooringItems?.reducer_cost,
                }),
              );
            }

            if (
              Helper.getApiCheckboxSelectedValue(
                flooringItems?.t_profile_required,
              )
            ) {
              flooringList?.push(
                getDataForFlooring({
                  title: 'T profile',
                  fabric: flooringItems?.t_profile,
                  qty: flooringItems?.t_profile_quantity,
                  price: flooringItems?.t_profile_mrp,
                  discount: flooringItems?.t_profile_discount,
                  totalPrice: flooringItems?.t_profile_cost,
                  grandTotal: flooringItems?.t_profile_cost,
                }),
              );
            }

            if (
              Helper.getApiCheckboxSelectedValue(flooringItems?.beeding_required)
            ) {
              flooringList?.push(
                getDataForFlooring({
                  title: 'Bedding',
                  fabric: flooringItems?.beeding,
                  qty: flooringItems?.beeding_quantity,
                  price: flooringItems?.beeding_mrp,
                  discount: flooringItems?.beeding_discount,
                  totalPrice: flooringItems?.beeding_cost,
                  grandTotal: flooringItems?.beeding_cost,
                }),
              );
            }
          }
        }

        if (index == 0 && wallpaperStyle && wallpaper) {
          const walls =
            wallpaper?.wall_information?.length > 0
              ? [...wallpaper?.wall_information]
              : [];
          walls?.map((_item, _index) => {
            const wallpaperStyleDetail =
              wallpaperStyle?.length > _index ? wallpaperStyle[_index] : '';
            // console.log("newww item:::", _item);
            const wall_data = getWallBreadthAndLength(_index);

            measurement['wallpaper_width'] = wall_data.breadth;
            measurement['wallpaper_length'] = wall_data.length;

            if (Helper.isWallpaperTypeMural(_item?.type)) {
              wallpaperList?.push(
                getDataForFlooring({
                  title: 'Mural',
                  fabric: _item?.wallpaper,
                  type: _item?.type,
                  price: _item?.price,
                  qty: _item?.total_roll_required,
                  width: getPriceFormate(_item?.total_area_sqft),
                  totalDiscount: _item?.discountedAmount,
                  discount: _item?.discount,
                  grandTotal: _item?.netAmount,
                  primerPrice: _item?.primer_price,
                  totalPrice: _item?.mural_cost,
                  wall_width: _item.wall_length,
                  wall_length: _item.wall_breadth,
                  wastage: _item?.totalAreaCoverByRoll_wastage,
                }),
              );

              if (_item?.per_sqft_installation_cost) {
                wallpaperInstallation?.push(
                  getDataForFlooring({
                    title: 'Mural Installation',
                    type: _item?.type,
                    price: _item?.per_sqft_installation_cost,
                    qty: '',
                    grandTotal: getPriceFormate(_item?.total_measurement_cost),
                    width: getPriceFormate(_item?.total_area_sqft),
                    primerPrice: _item?.primer_price,
                    wall_width: _item.wall_length,
                    wall_length: _item.wall_breadth,
                  }),
                );
              }
            } else {
              wallpaperList?.push(
                getDataForFlooring({
                  title: 'Wallpaper',
                  fabric: _item?.wallpaper,
                  type: _item?.type,
                  price: _item?.roll_price,
                  qty: getIntegerOnly(_item?.total_roll_required),
                  width: getPriceFormate(_item?.total_area_sqmt),
                  totalDiscount: _item?.discountedAmount,
                  discount: _item?.discount,
                  grandTotal: _item?.netAmount,
                  primerPrice: _item?.primer_price,
                  totalPrice: _item?.total_roll_cost,
                  wall_width: _item.wall_breadth,
                  wall_length: _item.wall_length,
                  wastage: _item?.totalAreaCoverByRoll_wastage,
                }),
              );

              if (_item?.per_roll_installation_cost) {
                wallpaperInstallation?.push(
                  getDataForFlooring({
                    title: 'Wallpaper Installation',
                    type: _item?.type,
                    price: _item?.per_roll_installation_cost,
                    qty: getIntegerOnly(_item?.total_roll_required),
                    grandTotal: getPriceFormate(_item?.total_measurement_cost),
                    width: getPriceFormate(_item?.total_area_sqmt),
                    primerPrice: _item?.primer_price,
                    wall_width: _item.wall_length,
                    wall_length: _item.wall_breadth,
                  }),
                );
              }
            }
          });
        }

        obj['fabricList'] = fabricList;
        obj['hardwareList'] = hardwareList;
        obj['blind'] = blindData;
        obj['stitchingList'] = stitchingList;
        obj['sofaList'] = sofaList;
        obj['sofaStitchingList'] = sofaStitchingList;
        obj['flooringList'] = flooringList;
        obj['flooringInstallation'] = flooringInstallation;
        obj['wallpaperList'] = wallpaperList;
        obj['wallpaperInstallation'] = wallpaperInstallation;
        obj['measurement'] = measurement;

        window.push(obj);
      });
    }

    return window;
  };

  const getTotalRoomAmount = (roomsList = []) => {
    return roomsList?.reduce((sum, room) => {
      const roomStyles = getRoomStyles(room, 0, tax);
      sum =
        sum +
        roomStyles?.reduce((res, roomStyle) => {
          return (res = +res + +getTotalWindowPrice(roomStyle));
        }, 0);
      return sum;
    }, 0);
  };

  const renderHeaderDetails = (title = "", value = "") => {
    return (
      <li class="list-group-item border-0 d-flex justify-content-between gap-4">
        <span class="mb-0">{title} :</span>
        <div className="w-75 text-start">
          <p> {value}</p>
        </div>
      </li>
    );
  };

  const getCategoryNames = (room) => {
    if (room) {
      const cates = room?.roomInfo?.selectedMaterial
        ? [...room?.roomInfo?.selectedMaterial]
        : [];
      const data = [];
      cates.map((item) => {
        if (item?.material?.name) {
          data.push(item?.material?.name);
        }
      });
      return data.join(", ");
    }
    return "";
  };

  const renderTotalEnquiryAmount = (
    amount,
    deposit = 0,
    ladder,
    cartageAmount,
    serviceAmount = 0, cartageAmountWithGst = 0
  ) => {
    const ladderCharge = ladder?.price;
    const getGrandTotal = () => {
      if (deposit && +deposit > 0) {
        return (
          parseFloat(ladderCharge) +
          parseFloat(amount) -
          parseFloat(deposit) +
          parseFloat(cartageAmountWithGst)
          // +ladderCharge + +cartageAmount + amount - +deposit + +serviceAmount
        );
      }
      return (
        parseFloat(ladderCharge) +
        parseFloat(amount) +
        parseFloat(cartageAmountWithGst)
      );
    };
    if (amount < 0) {
      return ``;
    }
    return (
      <>
        <tr>
          <th colSpan={2}>Total Room amount</th>
          <th colSpan={1}>{getPriceFormate(amount)}</th>
        </tr>

        {+deposit > 0 ? (
          <tr>
            <th colSpan={2}>Deposit amount</th>
            <th colSpan={1}>{deposit}</th>
          </tr>
        ) : (
          ``
        )}

        {ladder?.name ? (
          <tr>
            <th colSpan={2}>
              <p>
                Ladder charge ({ladder?.name})
                <span style={{ color: "red" }}>{ladder?.message}</span>
              </p>
            </th>
            <th colSpan={1}>{getPriceFormate(ladder?.price)}</th>
          </tr>
        ) : (
          ``
        )}
        <tr>
          <th colSpan={2}>Cartage amount</th>
          <th colSpan={1}>{cartageAmountWithGst}</th>
        </tr>
        <tr>
          <th colSpan={2}>Service amount</th>
          <th colSpan={1}>{serviceAmount}</th>
        </tr>
        <tr>
          <th colSpan={2}>Grand total</th>
          <th colSpan={1}>{getPriceFormate(getGrandTotal())}</th>
        </tr>
      </>
    );
  };

  const getDate = () => {
    // console.log("getAllEstimateData", EnquiryDetials.createdAt);
    if (EnquiryDetials?.createdAt) {
      return moment(EnquiryDetials?.createdAt).format("DD - MMM - YYYY");
    }
    return "";
  };

  const getIcName = () => {
    if (icUser?.firstName) {
      return icUser?.firstName + " " + icUser?.lastName;
    }
    return "";
  };
  const getAssetimateDate = () => {
    if (icUser?.firstName) {
      return icUser?.firstName + " " + icUser?.lastName;
    }
    return "";
  };
  const getName = () => {
    if (customer?.firstName) {
      return customer?.firstName + " " + customer?.lastName;
    }
    return "";
  };

  const getAddress = () => {
    if (customer?.addresses && customer?.addresses?.length > 0) {
      if (customer?.addresses[0]?.address) {
        return customer?.addresses[0]?.address;
      }
      if (customer?.addresses[0]?.street) {
        return customer?.addresses[0]?.street;
      }
    }
    return "Not found";
  };

  const depositAmount = EnquiryDetials?.amount ? EnquiryDetials?.amount : 0;
  const totalEnquiryAmount = getTotalRoomAmount(rooms);

  return (
    <div>
      {Loading === true ? (
        <Loader />
      ) : (
        <div className="Estimate">

          <div style={{ position: "fixed", top: 30, right: 10 }}>
            <button className="btn btn-primary" onClick={() => window.print()}>
              Print Estimate
            </button>
          </div>
          <div>

            <table
              border={0}
              cellPadding={0}
              cellSpacing={0}
              className="nl-container"
              role="presentation"
              style={{
                msoTableLspace: "0pt",
                msoTableRspace: "0pt",
                backgroundColor: "#fbfbfb",
              }}
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border={0}
                      cellPadding={0}
                      cellSpacing={0}
                      className="row row-1"
                      role="presentation"
                      style={{ msoTableLspace: "0pt", msoTableRspace: "0pt" }}
                      width="100%"
                    >
                      <tbody>
                        <table
                          align="center"
                          border={0}
                          cellPadding={0}
                          cellSpacing={0}
                          className="row-content stack"
                          role="presentation"
                          style={{
                            msoTableLspace: "0pt",
                            msoTableRspace: "0pt",
                            backgroundColor: "#efefef",
                            color: "#000000",
                            borderRadius: 0,
                          }}
                        >
                          <div className="d-flex justify-content-center my-4">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/F&FEST-LOGO.png`}
                              style={{
                                display: "block",
                                height: "auto",
                                border: 0,
                                width: 400,
                                maxWidth: "100%",
                              }}
                              width={165}
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                            }}

                          >
                            <ul style={{
                              width: "50%"
                            }}>
                              {renderHeaderDetails("Date", getDate())}

                              {renderHeaderDetails("Enquiry No", id)}
                              {renderHeaderDetails('Status', EnquiryDetials?.status ?? '')}
                              {renderHeaderDetails("Sales Person", getIcName())}
                              {renderHeaderDetails("Client Name", getName())}

                              {renderHeaderDetails("Contact No", contactNumber)}

                            </ul>
                            <ul style={{
                              width: "50%"
                            }}>
                              {renderHeaderDetails('Delivery Address ', getDeliveryAddress())}
                              {renderHeaderDetails('Billing Address ', getBillingAddress())}
                              {renderHeaderDetails("Email", email)}
                              {Gst ? renderHeaderDetails("GST No", Gst) : ""}
                              {EnquiryDetials?.expected_delivery_date && renderHeaderDetails('Delivery date', EnquiryDetials?.expected_delivery_date)}
                              {EnquiryDetials?.expected_installation_date && renderHeaderDetails('Exp. Installation date', EnquiryDetials?.expected_installation_date)}
                              {re_measurement_date && renderHeaderDetails(
                                'Re measurement date',
                                re_measurement_date,
                              )}
                            </ul>
                          </div>
                        </table>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <div
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
                paddingBottom: "5%",
              }}
            >
              {/* {console.log("rooms", rooms)} */}
              {rooms?.length > 0
                ? rooms?.map((room, roomIndex) => {
                  // console.log("rooooooommmMMM", room);
                  const styles = getRoomStyles(room);
                  // { console.log("Wall width and height check krne ke liye ", room) }
                  return (
                    <table className="table">
                      {roomIndex === 0 ? (
                        <tr>
                          <th>Room name</th>
                          <th>Category</th>
                          <th>Room description</th>
                        </tr>
                      ) : (
                        ``
                      )}
                      <tr>
                        <td>{room?.roomInfo?.roomName}</td>

                        <td>{getCategoryNames(room)}</td>
                        <td>
                          {styles?.map((roomStyle, styleIndex) => {
                            const totalRoom = getTotalWindowPrice(roomStyle);
                            const measurement = roomStyle?.measurement;

                            return (
                              <table class="table">
                                {renderRoomCurtain(roomStyle, styleIndex, room)}
                                {renderStitchingCost(roomStyle)}
                                {renderRoomHardware(roomStyle, styleIndex)}
                                {renderRoomBlind(roomStyle, styleIndex, room)}
                                {renderBlindStitchingCost(
                                  roomStyle,
                                  styleIndex
                                )}
                                {renderBlindHardware(roomStyle, styleIndex)}
                                {renderSofa(roomStyle, styleIndex)}
                                {renderSofaStitching(roomStyle, styleIndex)}
                                {renderFlooring(roomStyle, styleIndex, room)}
                                {renderFlooringInstalltion(
                                  roomStyle,
                                  styleIndex, room
                                )}
                                {renderWallpaper(roomStyle, styleIndex, measurement)}
                                {renderWallpaperInstallation(
                                  roomStyle,
                                  styleIndex, measurement
                                )}
                              </table>
                            );
                          })}
                        </td>
                      </tr>

                      {roomIndex === rooms.length - 1
                        ? renderTotalEnquiryAmount(
                          totalEnquiryAmount,
                          depositAmount,
                          getLadder(),
                          cartageAmount,
                          serviceAmount,
                          cartageAmountWithGst,
                        )
                        : ``}
                    </table>
                  );
                })
                : ``}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEstimate;
