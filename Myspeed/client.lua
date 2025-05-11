local isPauseMenuActive = false
local wasInVehicle = false

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        
        local playerPed = PlayerPedId()
        local isInVehicle = IsPedInAnyVehicle(playerPed, false)
        local isDriver = isInVehicle and GetPedInVehicleSeat(GetVehiclePedIsIn(playerPed, false), -1) == playerPed
        
       
        if IsPauseMenuActive() then
            if not isPauseMenuActive then
                isPauseMenuActive = true
                SendNUIMessage({type = "setVisible", visible = false})
            end
        else
            if isPauseMenuActive then
                isPauseMenuActive = false
                if isDriver then
                    SendNUIMessage({type = "setVisible", visible = true})
                end
            end
        end
        
        if isDriver and not isPauseMenuActive then
            if not wasInVehicle then
                SendNUIMessage({type = "setVisible", visible = true})
                wasInVehicle = true
            end
            
            local vehicle = GetVehiclePedIsIn(playerPed, false)
            local speed = GetEntitySpeed(vehicle) * 3.6 
            local maxSpeed = GetVehicleEstimatedMaxSpeed(vehicle) * 3.6
            local fuelLevel = GetVehicleFuelLevel(vehicle)
            local engineHealth = GetVehicleEngineHealth(vehicle)
            
            SendNUIMessage({
                type = "updateSpeedometer",
                speed = speed,
                maxSpeed = maxSpeed,
                fuelLevel = fuelLevel,
                engineHealth = engineHealth
            })
        else
            if wasInVehicle then
                SendNUIMessage({type = "setVisible", visible = false})
                wasInVehicle = false
            end
        end
    end
end)