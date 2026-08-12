import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { GetDataWithToken } from "../ApiHelper/ApiHelper";

const WcrModal = ({ modalToggle, isOpen,data }) => {
    // const [data, setData] = useState();
    const closeBtn = (
      <button className="btn btn-primary" onClick={modalToggle} type="button">
         &times;
       </button>
    );
    
   

    return (
          <Modal isOpen={isOpen} fullscreen toggle={modalToggle} scrollable>
            <ModalHeader className='ms-2'
                close={closeBtn}
            >WCR Report</ModalHeader>
            <ModalBody>
              <Table bordered>
                <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>Name</th>
                      <th>STATUS</th>
                       <th>S.NO</th>
                      <th>Name</th>
                    <th>STATUS</th>
                     <th>S.NO</th>
                      <th>Name</th>
                      <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                         <tr>
                        <td>1</td>
                            <td>Pelmet</td>
                            <td>{ data?.pelmet===true?"True":"False"}</td>
                       <td>2</td>
                        <td>
                          Belt
                        </td>
                        <td>
                         {data?.belt===true?"True":"False"}
                            </td>
                     <td>3</td>
                        <td>
                          Belt Piping
                        </td>
                        <td>
                         {data?.beltPiping===true?"True":"False"}
                        </td>
                        </tr>
                         <tr>
                        <td>4</td>
                            <td>Belt Border</td>
                            <td>{ data?.beltBorder===true?"True":"False"}</td>
                       <td>5</td>
                        <td>
                          Primary Border
                        </td>
                        <td>
                         {data?.primaryBorder===true?"True":"False"}
                            </td>
                     <td>6</td>
                        <td>
                        Secondary Border
                        </td>
                        <td>
                         {data?.secondaryBorder===true?"True":"False"}
                        </td>
                        </tr>
                                <tr>
            <td>7</td>
            <td>Fabric 1</td>
            <td>{data?.fabric1 === true ? "True" : "False"}</td>
            <td>8</td>
            <td>Fabric 2</td>
            <td>{data?.fabric2 === true ? "True" : "False"}</td>
            <td>9</td>
            <td>Mock</td>
            <td>{data?.mock === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>10</td>
            <td>Lining</td>
            <td>{data?.lining === true ? "True" : "False"}</td>
            <td>11</td>
            <td>Sheer</td>
            <td>{data?.sheer === true ? "True" : "False"}</td>
            <td>12</td>
            <td>Primary Rod</td>
            <td>{data?.primaryRod === true ? "True" : "False"}</td>
                        </tr>
                         <tr>
            <td>13</td>
            <td>Curtain Stick</td>
            <td>{data?.curtainStick === true ? "True" : "False"}</td>
            <td>14</td>
            <td>End Cap Wall Support</td>
            <td>{data?.endCapWallSupport === true ? "True" : "False"}</td>
            <td>15</td>
            <td>Extra Bracket Support</td>
            <td>{data?.extraBracketSupport === true ? "True" : "False"}</td>
                        </tr>
                         <tr>
            <td>16</td>
            <td>Extra Bracket</td>
            <td>{data?.extraBracket === true ? "True" : "False"}</td>
            <td>17</td>
            <td>End Cap</td>
            <td>{data?.endCap === true ? "True" : "False"}</td>
            <td>18</td>
            <td>Finial</td>
            <td>{data?.finial === true ? "True" : "False"}</td>
                        </tr>
                         <tr>
            <td>19</td>
            <td>Tie Knob</td>
            <td>{data?.tieKnob === true ? "True" : "False"}</td>
            <td>20</td>
            <td>Secondary Rod</td>
            <td>{data?.secondaryRod === true ? "True" : "False"}</td>
            <td>21</td>
            <td>Primary Track</td>
            <td>{data?.primary_track === true ? "True" : "False"}</td>
                        </tr>
                             
        <tr>
            <td>13</td>
            <td>Curtain Stick</td>
            <td>{data?.curtainStick === true ? "True" : "False"}</td>
            <td>14</td>
            <td>End Cap Wall Support</td>
            <td>{data?.endCapWallSupport === true ? "True" : "False"}</td>
            <td>15</td>
            <td>Extra Bracket Support</td>
            <td>{data?.extraBracketSupport === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>16</td>
            <td>Extra Bracket</td>
            <td>{data?.extraBracket === true ? "True" : "False"}</td>
            <td>17</td>
            <td>End Cap</td>
            <td>{data?.endCap === true ? "True" : "False"}</td>
            <td>18</td>
            <td>Finial</td>
            <td>{data?.finial === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>19</td>
            <td>Tie Knob</td>
            <td>{data?.tieKnob === true ? "True" : "False"}</td>
            <td>20</td>
            <td>Secondary Rod</td>
            <td>{data?.secondaryRod === true ? "True" : "False"}</td>
            <td>21</td>
            <td>Primary Track</td>
            <td>{data?.primary_track === true ? "True" : "False"}</td>
        </tr>
      
    
       
        <tr>
            <td>22</td>
            <td>Primary Track Motor</td>
            <td>{data?.primaryTrackMotor === true ? "True" : "False"}</td>
            <td>23</td>
            <td>Primary Track Remote</td>
            <td>{data?.primaryTrackRemote === true ? "True" : "False"}</td>
            <td>24</td>
            <td>Primary Overlapper</td>
            <td>{data?.primaryOverlapper === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>25</td>
            <td>Primary Track Curtain Stick</td>
            <td>{data?.primaryTrackCuratinStick === true ? "True" : "False"}</td>
            <td>26</td>
            <td>Primary Extra Track Bracket</td>
            <td>{data?.primaryExtraTrackBracket === true ? "True" : "False"}</td>
            <td>27</td>
            <td>Primary Track Tie Knob</td>
            <td>{data?.primary_track_tieknob === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>28</td>
            <td>Secondary Track Tie Knob</td>
            <td>{data?.secondary_track_tieknob === true ? "True" : "False"}</td>
            <td>29</td>
            <td>Mock Track Tie Knob</td>
            <td>{data?.mock_track_tieknob === true ? "True" : "False"}</td>
            <td>30</td>
            <td>L Bracket</td>
            <td>{data?.Lbracket === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>31</td>
            <td>Secondary Track</td>
            <td>{data?.secondary_track === true ? "True" : "False"}</td>
            <td>32</td>
            <td>Secondary Track Motor</td>
            <td>{data?.secondaryTrackMotor === true ? "True" : "False"}</td>
            <td>33</td>
            <td>Secondary Track Remote</td>
            <td>{data?.secondaryTrackRemote === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>34</td>
            <td>Secondary Overlapper</td>
            <td>{data?.secondaryOverlapper === true ? "True" : "False"}</td>
            <td>35</td>
            <td>Mock Track Curtain Stick</td>
            <td>{data?.mockTrackCuratinStick === true ? "True" : "False"}</td>
            <td>36</td>
            <td>Mock Extra Track Bracket</td>
            <td>{data?.mockExtraTrackBracket === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>37</td>
            <td>Flooring</td>
            <td>{data?.flooring === true ? "True" : "False"}</td>
            <td>38</td>
            <td>Sofa</td>
            <td>{data?.sofa === true ? "True" : "False"}</td>
            <td>39</td>
            <td>Wall Panel</td>
            <td>{data?.wallpanel === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>40</td>
            <td>Bed Back</td>
            <td>{data?.bedback === true ? "True" : "False"}</td>
            <td>41</td>
            <td>Pouffee</td>
            <td>{data?.pouffee === true ? "True" : "False"}</td>
            <td>42</td>
            <td>Cushion</td>
            <td>{data?.cushion === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>43</td>
            <td>Wallpaper</td>
            <td>{data?.wallpaper === true ? "True" : "False"}</td>
            <td>44</td>
            <td>Blind Fabric</td>
            <td>{data?.blindFabricArr === true ? "True" : "False"}</td>
            <td>45</td>
            <td>Blind Lining</td>
            <td>{data?.blindLiningArr === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>46</td>
            <td>Blind Shades</td>
            <td>{data?.blindShadesArr === true ? "True" : "False"}</td>
            <td>47</td>
            <td>Blind Border Fabric</td>
            <td>{data?.blindBorderFabricArr === true ? "True" : "False"}</td>
            <td>48</td>
            <td>Blind Track</td>
            <td>{data?.blindTrack === true ? "True" : "False"}</td>
                        </tr>
            <tr>
            <td>49</td>
            <td>Blind Track Remote</td>
            <td>{data?.blindTrackRemote === true ? "True" : "False"}</td>
            <td>50</td>
            <td>Blind Track Motor</td>
            <td>{data?.blind_track_motor === true ? "True" : "False"}</td>
            <td>51</td>
            <td>Blind Extra Bracket</td>
            <td>{data?.blindExtraBracket === true ? "True" : "False"}</td>
        </tr>
        <tr>
            <td>52</td>
            <td>Blind Type Search Fabric</td>
            <td>{data?.blind_type_search_fabric === true ? "True" : "False"}</td>

        </tr>              
        

                </tbody>
            </Table>
                
                      
            
            </ModalBody>
        </Modal>
    )
}
export default WcrModal;